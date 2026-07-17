import axios from "axios";
//-------------------------------------------------------
//Getting user data from github api

export async function fetchGitHubProfile(username) {
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
}
