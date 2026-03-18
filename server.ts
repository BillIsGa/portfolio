import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/roblox/games", async (req, res) => {
    const { placeIds } = req.query;
    if (!placeIds || typeof placeIds !== "string") {
      return res.status(400).json({ error: "placeIds query parameter is required" });
    }

    try {
      const idArray = placeIds.split(",");
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      };

      // 1. Get Universe IDs from Place IDs
      const placeDetailsRes = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${placeIds}`, { headers });
      const placeDetails = await placeDetailsRes.json();
      
      if (!Array.isArray(placeDetails)) {
        console.error("Invalid placeDetails response:", placeDetails);
        return res.status(500).json({ error: "Failed to fetch place details from Roblox", details: placeDetails });
      }

      // Create a map of placeId -> universeId
      const placeToUniverse = new Map();
      placeDetails.forEach((pd: any) => {
        placeToUniverse.set(pd.placeId.toString(), pd.universeId);
      });

      const universeIds = Array.from(new Set(placeDetails.map((pd: any) => pd.universeId))).filter(Boolean).join(",");
      
      if (!universeIds) {
        return res.status(404).json({ error: "No universe IDs found for provided place IDs" });
      }

      // 2. Get Game Details (Visits, Playing)
      const gameDetailsRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`, { headers });
      const gameDetails = await gameDetailsRes.json();

      if (!gameDetails || !Array.isArray(gameDetails.data)) {
        console.error("Invalid gameDetails response:", gameDetails);
        return res.status(500).json({ error: "Failed to fetch game details from Roblox", details: gameDetails });
      }

      // 3. Get Icons
      const iconsRes = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=512x512&format=Png&isCircular=false`, { headers });
      const iconsData = await iconsRes.json();

      // Combine data
      // We want to return a result for each requested placeId if possible
      const results = idArray.map(pid => {
        const uid = placeToUniverse.get(pid);
        if (!uid) return null;

        const game = gameDetails.data.find((g: any) => g.id === uid);
        if (!game) return null;

        const icon = iconsData.data?.find((i: any) => i.targetId === uid)?.imageUrl;
        
        return {
          universeId: uid,
          placeId: pid,
          name: game.name,
          visits: game.visits,
          playing: game.playing,
          iconUrl: icon
        };
      }).filter(Boolean);

      res.json(results);
    } catch (error) {
      console.error("Roblox API Error:", error);
      res.status(500).json({ error: "Failed to fetch data from Roblox API" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
