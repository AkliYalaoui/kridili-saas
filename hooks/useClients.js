import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const useClients = (get, keywords) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getClients() {
    try {
      setError(null);
      setLoading(true);
      let res;
      if (get === "worse") {
        res = await supabase.rpc("get_worse_clients");
      } else if (get === "search") {
        res = await supabase
          .from("clients")
          .select()
          .filter("full_name", "ilike", `%${keywords}%`);
      } else {
        res = await supabase.from("clients").select();
      }
      console.log(get);
      console.log(res);
      if (res.error) throw res.error;
      setClients(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClients();
  }, [keywords]);

  return { clients, setClients, loading, error };
};

export default useClients;
