import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { clearUserInfos } from "../../redux/Reducer/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

function Header() {
  const isLoggedIn = useSelector((state: any) => state.loginReducer.loggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clearUserInfos());
    navigate("/");
  }

  return (
    <header>
      <Link to="/">
        <h2 className="header--title">The Good Seat</h2>
      </Link>
      <nav>
        {isLoggedIn ? (
          <Button
            colorScheme="red"
            rightIcon={<ArrowForwardIcon />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        ) : (
          <ul>
            <Link to="/">
              <li>Sign in</li>
            </Link>
            <Link to="/signup">
              <li>Sign up</li>
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
