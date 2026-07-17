export default function RepoList({ repos }) {
  return (
    <div>
      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank">{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
