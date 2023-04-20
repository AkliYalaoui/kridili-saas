import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const useTransactions = (get, filter) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getTransactions() {
    try {
      setError(null);
      setLoading(true);
      let res;
      if (get === "date") {
        res = await supabase
          .from("transactions")
          .select("*,client_id(*)")
          .eq("created_at", filter["selectedDated"])
          .order("created_at", { ascending: false });
      } else if (get === "client") {
        res = await supabase
          .from("transactions")
          .select("*")
          .eq("client_id", filter["clientID"])
          .order("created_at", { ascending: false });
      } else {
        res = await supabase
          .from("transactions")
          .select("*,client_id(*)")
          .order("created_at", { ascending: false })
          .limit(5);
      }
      console.log(res);

      if (res.error) throw res.error;
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const date = filter?.selectedDated;
  useEffect(() => {
    getTransactions();
  }, [date]);

  return { transactions,setTransactions,getTransactions, loading, error };
};

export default useTransactions;
