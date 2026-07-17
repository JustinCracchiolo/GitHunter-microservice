import SearchForm from "../components/SearchForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (username) => {
    navigate(`/results?user=${username}`);
  };

  return (
    <div>
      <h1>GitHunter</h1>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}
