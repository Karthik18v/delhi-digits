import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookie.get("jwtToken");

  return token === undefined && <Navigate to="/login" replace />;
};

export default ProtectedRoute;
