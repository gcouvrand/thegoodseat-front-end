import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const GuestRoute = ({ children }: Props) => {
  const token = useSelector((state: any) => state.loginReducer.token);
  if (token) {
    return <Navigate to="/user" />;
  }

  return children;
};

export default GuestRoute;
