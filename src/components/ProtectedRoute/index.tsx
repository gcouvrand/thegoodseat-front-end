import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const ProtectedRoute = ({ children }: Props) => {
  const token = useSelector((state: any) => state.loginReducer.token);
  console.log(token);
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
