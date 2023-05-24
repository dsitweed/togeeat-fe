import { useApiClient } from "@/shared/hooks/api";
import { useEffect, useState } from "react";
import HistoryItem from "../components/HistoryItem";

function MatchingHistoryPage() {
  const [historyList, setHistoryList] = useState([]);

  const apiClient = useApiClient("/matching-history");

  async function fetchHistoryList() {
    const response = await apiClient.getAll();

    setHistoryList(response.data.items);
  }

  useEffect(() => {
    fetchHistoryList();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* For demo */}
      <HistoryItem />
      {historyList?.map((item, index) => (
        <HistoryItem key={index} />
      ))}
    </div>
  );
}

export default MatchingHistoryPage;
