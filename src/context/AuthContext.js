import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = React.createContext([null, () => {}]);
export const FilterContext = React.createContext([null, () => {}]);

function AuthProvider(props) {
  const [token, setToken] = useLocalStorage("auth", null);
  const [filter, setFilter] = useLocalStorage("filter", null);

  return (
    <AuthContext.Provider value={[token, setToken]} className="border">
      <FilterContext.Provider value={[filter, setFilter]}>
        {props.children}
      </FilterContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
