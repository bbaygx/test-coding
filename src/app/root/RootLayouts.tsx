import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayouts() {
  useAuth();
  return (
    <div>
      <Outlet />
    </div>
  );
}
