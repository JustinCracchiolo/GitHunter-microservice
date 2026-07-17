import express from "express";
import { fetchGitHubProfile } from "../services/github.js";
import { analyzeProfile } from "../services/ai.js";
//import { getCache, setCache } from "../services/cache.js";
import { apiError } from "../utils/errors.js";
//-----------------------------------------------------

const router = express.Router();

router.post("/", async (req, res) => {
  const { github_username } = req.body;

  if (!github_username) {
    return apiError(res, 400, "github_username is required");
  }

  try {
    // Check cache
    /*
    const cached = await getCache(github_username);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    */

    // Fetch GitHub data
    const data = await fetchGitHubProfile(github_username);

    // AI analysis
    const aiAnalysis = await analyzeProfile(data);

    const response = {
      profile: data.user,
      repos: data.repos,
      analysis: aiAnalysis
    };

    // Cache result
    //await setCache(github_username, response);

    res.json(response);

  } catch (err) {
    console.error(err);

    if (err.message === "GitHub user not found") {
      return apiError(res, 404, "GitHub user not found");
    }

    if (err.message === "AI analysis failed") {
      return apiError(res, 500, "AI failed to analyze profile");
    }

    return apiError(res, 500, "Unexpected server error");
  }
});

export default router;