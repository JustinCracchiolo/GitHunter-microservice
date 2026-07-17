import axios from "axios";
//----------------------------------
//Get user data from github api

export async function fetchGitHubProfile(username) {
  try {
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    const [userRes, reposRes] = await Promise.all([
      axios.get(userUrl),
      axios.get(reposUrl)
    ]);

    return {
      user: userRes.data,
      repos: reposRes.data
    };

  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error("GitHub user not found");
    }
    throw new Error("GitHub API error");
  }
}

