import { useContext } from "react";

import { AuthContext } from "../components/Auth/AuthProvider.jsx";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
