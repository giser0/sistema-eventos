import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({
  children,
  role,
}: Props) {

  const token =
    localStorage.getItem("token");

  const user =
    localStorage.getItem("user");

  if (!token || !user) {

    return <Navigate to="/" />;

  }

  const parsedUser =
    JSON.parse(user);

  if (parsedUser.rol !== role) {

    return <Navigate to="/" />;

  }

  return children;

}

export default ProtectedRoute;