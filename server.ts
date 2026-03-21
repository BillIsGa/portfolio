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

    const FALLBACK_MAPPING: Record<string, number> = {
      "8737602449": 3325983364,   // PLS DONATE
      "6161235818": 2260351343,   // Twisted
      "16446180574": 5649983416,  // Twenty One
      "12357508217": 4366551846,  // Chill Obby
      "13389049867": 4729007328,  // 1% Win Obby
      "14448027693": 5092019445,  // Mega Princess Tycoon
      "15885874861": 5589089531,  // Eat Slimes
      "16446142514": 5782782977,  // Floor is Lava
      "105265986112006": 3933519391, // Short Creepy Horror Stories
      "113323927469374": 4197793466, // Musical Chairs
    };

    try {
      const idArray = placeIds.split(",").map(id => id.trim()).filter(Boolean);
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
      };

      console.log(`[Roblox Proxy] Fetching stats for ${idArray.length} places...`);

      const placeToUniverse = new Map<string, number>();
      idArray.forEach(pid => {
        if (FALLBACK_MAPPING[pid]) placeToUniverse.set(pid, FALLBACK_MAPPING[pid]);
      });

      // 1. Resolve missing Universe IDs
      const missingIds = idArray.filter(pid => !placeToUniverse.has(pid));
      if (missingIds.length > 0) {
        console.log(`[Roblox Proxy] Resolving universe IDs for: ${missingIds.join(",")}`);
        const pRes = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${missingIds.join(",")}`, { headers });
        if (pRes.ok) {
          const data = await pRes.json();
          const details = data?.data || data;
          if (Array.isArray(details)) {
            details.forEach((pd: any) => {
              if (pd.universeId) {
                console.log(`[Roblox Proxy] Resolved: Place ${pd.placeId} -> Universe ${pd.universeId}`);
                placeToUniverse.set(pd.placeId.toString(), pd.universeId);
              }
            });
          }
        } else {
          console.error(`[Roblox Proxy] Place details API failed: ${pRes.status} ${pRes.statusText}`);
        }
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
