import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { analyzeUser } from "../api/analyze";
import ProfileCard from "../components/ProfileCard";
import RepoList from "../components/RepoList";
import AnalysisCard from "../components/AnalysisCard";
//----------------------------------------------------------

export default function Results() {
  const [params] = useSearchParams();
  const username = params.get("user");

  const [data, setData] = useState(null); //set data to analyzed ai results in json format
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await analyzeUser(username); //calls from frontend/src/api/analyze 
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ProfileCard profile={data.profile} />
      <RepoList repos={data.repos} />
      <AnalysisCard analysis={data.analysis} />
    </div>
  );
}
