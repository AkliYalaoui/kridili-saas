import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";

const useChartData = () => {
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      setError(null);
      setLoading(true);
      const res = await supabase.rpc("debts_per_day");
      console.log("debts_per_day");
      if (res.error) throw res.error;
      const data = res.data.reduce(
        (prev, currrent) => {
          prev["labels"].push(currrent["created_at"]);
          prev["dataset"].push(currrent["nbr"]);
          return prev;
        },
        { labels: [], dataset: [] }
      );

      setLabels(data.labels);
      setDataset(data.dataset);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { dataset, labels, getData, loading, error };
};

export default useChartData;
