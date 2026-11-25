import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../Loader/page";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const { user, authReady } = useAuth();

  if (!authReady) return <Loader />;
  if (!user) return <Navigate to="/psychologists" replace />;

  return children;
}
