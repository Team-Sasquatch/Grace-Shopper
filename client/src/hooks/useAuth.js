import { useContext } from "react";
import { AuthContext } from "./auth/authProvider";
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
