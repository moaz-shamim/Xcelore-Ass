import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return currentUser ? (currentUser.role === "Admin" ? <Outlet /> : <Navigate to="/profile" />) : <Navigate to="/sign-in" />;
}
