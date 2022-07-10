import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { clearUserInfos } from "../../redux/Reducer/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

function Header(props: any) {
  const isLoggedIn = useSelector((state: any) => state.loginReducer.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clearUserInfos());
    navigate("/");
  }

  return (
    <header>
      <Link to="/">
        <h2 className="header--title">{props.title}</h2>
      </Link>
      <nav>
        {isLoggedIn ? (
          <Button
            size='sm'
            colorScheme="red"
            rightIcon={<ArrowForwardIcon />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        ) : (
          <ul>
            <Link to="/">
              <li>{props.signin}</li>
            </Link>
            <Link to="/signup">
              <li>{props.signup}</li>
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
