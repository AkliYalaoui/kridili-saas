import { useState, useEffect } from "react";
import { supabase } from '../lib/initSupabase';

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getClients() {
    try {
      setError(null);
      setLoading(true);
      const res = await supabase.from("clients").select();
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
  }, []);

  return { clients, setClients, loading, error };
};

export default useClients;
