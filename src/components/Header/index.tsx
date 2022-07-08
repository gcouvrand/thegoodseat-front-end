import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { clearUserInfos } from "../../redux/Reducer/loginSlice";
import { Link, useNavigate } from "react-router-dom";

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
    <header className="header">
      <Link to="/">
        <h2 className="header--title">The Good Seat</h2>
      </Link>
      <nav>
        {isLoggedIn ? (
          <ul>
            <li onClick={handleLogout}>Log out</li>
          </ul>
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
