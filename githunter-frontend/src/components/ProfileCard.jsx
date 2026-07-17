export default function ProfileCard({ profile }) {
  return (
    <div>
      <img src={profile.avatar_url} width="100" />
      <h2>{profile.name || profile.login}</h2>
      <p>{profile.bio}</p>
      <p>Followers: {profile.followers}</p>
      <p>Following: {profile.following}</p>
    </div>
  );
}
