import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { clearUserInfos } from '../../redux/Reducer/loginSlice'
import { useNavigate } from "react-router-dom";

function Header() {
  const isLoggedIn = useSelector((state: any) => state.loginReducer.loggedIn);
  console.log(isLoggedIn)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(clearUserInfos())
    navigate('/')
  }


  return (
    <header className="header">
      <h2 className="header--title">The Good Seat</h2>
      <nav>
        {isLoggedIn ? (
          <ul>
            <li onClick={handleLogout}>Log out</li>
          </ul>
        ) : (
          <ul>
            <li>Sign in</li>
            <li>Sign up</li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
