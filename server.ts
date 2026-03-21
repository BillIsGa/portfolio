import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

  // API routes
  app.get("/api/roblox/games", async (req, res) => {
    const { placeIds } = req.query;
    if (!placeIds || typeof placeIds !== "string") {
      return res.status(400).json({ error: "placeIds query parameter is required" });
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
      const idArray = placeIds.split(",").map(id => id.trim()).filter(Boolean);
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
      };

      console.log(`[Roblox Proxy] Fetching stats for ${idArray.length} places...`);

      const placeToUniverse = new Map<string, number>();
      
      const missingIds = idArray.filter(pid => !placeToUniverse.has(pid));
      if (missingIds.length > 0) {
        await Promise.all(missingIds.map(async (pid) => {
          try {
            const r = await fetch(`https://apis.roblox.com/universes/v1/places/${pid}/universe`, { headers });
            if (r.ok) {
              const d = await r.json();
              if (d?.universeId) placeToUniverse.set(pid, d.universeId);
            }
          } catch {}
        }));
      }

      const universeIds = Array.from(new Set(placeToUniverse.values())).filter(Boolean);
      if (universeIds.length === 0) {
        console.warn("[Roblox Proxy] No universe IDs resolved.");
        return res.json([]);
      }

      // 2. Fetch Game Details & Icons
      const uIdsStr = universeIds.join(",");
      console.log(`[Roblox Proxy] Fetching details for universeIds: ${uIdsStr}`);
      
      const [gRes, iRes] = await Promise.allSettled([
        fetch(`https://games.roblox.com/v1/games?universeIds=${uIdsStr}`, { headers }),
        fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${uIdsStr}&size=512x512&format=Png&isCircular=false`, { headers })
      ]);

      let gData = { data: [] };
      if (gRes.status === 'fulfilled' && gRes.value.ok) {
        gData = await gRes.value.json();
      } else {
        console.error("[Roblox Proxy] Games API failed", gRes.status === 'rejected' ? gRes.reason : 'status not ok');
      }

      let iData = { data: [] };
      if (iRes.status === 'fulfilled' && iRes.value.ok) {
        iData = await iRes.value.json();
      } else {
        console.error("[Roblox Proxy] Icons API failed", iRes.status === 'rejected' ? iRes.reason : 'status not ok');
      }

      const results = idArray.map(pid => {
        const uid = placeToUniverse.get(pid);
        if (!uid) return null;

        const game = gData.data?.find((g: any) => g.id === uid);
        if (!game) return null;

        const icon = iData.data?.find((i: any) => i.targetId === uid)?.imageUrl;
        
        return {
          placeId: pid,
          universeId: uid,
          name: game.name,
          visits: game.visits,
          playing: game.playing,
          iconUrl: icon
        };
      }).filter(Boolean);

      console.log(`[Roblox Proxy] Successfully fetched ${results.length} results.`);
      res.json(results);
    } catch (error) {
      console.error("[Roblox Proxy] Error:", error);
      res.status(500).json({ error: "Roblox proxy failed" });
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
