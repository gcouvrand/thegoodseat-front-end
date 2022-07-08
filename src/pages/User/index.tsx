import { useSelector } from "react-redux";

function User() {
  const firstName = useSelector((state: any) => state.loginReducer.firstName);
  console.log(firstName);
  return <h2> Welcome {firstName} !</h2>;
}

export default User;
