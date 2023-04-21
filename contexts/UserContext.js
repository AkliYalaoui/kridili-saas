import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../lib/initSupabase";

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log({ data, error });
        if (error) throw error;
        setSession(data.session);
        setUser(data?.session?.user ?? null);
        supabase.auth.onAuthStateChange(async (event, session) => {
          console.log(`Supabase auth event: ${event}`);
          setSession(session);
          setUser(session?.user ?? null);
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const value = {
    session,
    user,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
