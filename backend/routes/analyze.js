import express from "express";
import { fetchGitHubProfile } from "../services/github.js";
import { analyzeProfile } from "../services/ai.js";
import { getCache, setCache } from "../services/cache.js";
//-----------------------------------------------------

const router = express.Router();

router.post("/", async (req, res) => {
  const { github_username } = req.body;

  if (!github_username) {
    return res.status(400).json({ error: "github_username is required" });
  }

  try {
    
    //Check to see if user is already in cache before prompting AI
    const cached = await getCache(github_username)
    if(cached) {
        return res.json(JSON.parse(cached))
    }

    // Fetch GitHub data
    const data = await fetchGitHubProfile(github_username);

    // Send data to Gemini
    const aiAnalysis = await analyzeProfile(data);

    // Return combined result: user data, repos, and ai analysis
    const response = {
      profile: data.user,
      repos: data.repos,
      analysis: aiAnalysis
    }

    //Update the cache 
    await setCache(github_username, res)

    //return response
    res.json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze GitHub profile" });
  }
});

export default router;
