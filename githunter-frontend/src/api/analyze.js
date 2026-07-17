export async function analyzeUser(username) {
  const res = await fetch("http://localhost:3000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ github_username: username }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Unknown error");
  }

  return await res.json();
}
