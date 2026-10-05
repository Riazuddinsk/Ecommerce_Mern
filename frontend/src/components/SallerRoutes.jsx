import { Navigate, Outlet } from "react-router";

export default function SellerRoute() {
  const role = localStorage.getItem("role");

  if (role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}