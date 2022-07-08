import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserInfos } from "../../redux/Reducer/loginSlice";
import { SignInApi } from "../../services/ApiCall";
import "./index.css";

function SignInBox() {
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const clearError = () => {
    setErrorMessage(false);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const data = await SignInApi(email, password);

      if (data) {
        dispatch(
          updateUserInfos({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            token: data.token,
            loggedIn: true,
          })
        );
        navigate("/user");
      }
    } catch (e: any) {
      setErrorMessage(true);
    }
  };

  return (
    <div className="wrapper">
      <form className="signin--form">
        <div className="signin--textfield">
          <input
            type="text"
            required
            onChange={onChangeEmail}
            onFocus={clearError}
          />
          <span className="signin--textfield-highlight"></span>
          <span className="signin--textfield-bar"></span>
          <label>email</label>
        </div>

        <div className="signin--textfield">
          <input
            type="text"
            required
            onChange={onChangePassword}
            onFocus={clearError}
          />
          <span className="signin--textfield-highlight"></span>
          <span className="signin--textfield-bar"></span>
          <label>password</label>
        </div>

        {errorMessage ? (
          <p className="signin--form-error">
            Can't log in. Please check your credentials !
          </p>
        ) : (
          ""
        )}
        <button className="signin--button" onClick={handleSubmit}>
          SIGN IN
        </button>
        <div className="signin--link-to-sign-up">
          <Link to="/signup">
            If you don't already have an account, you can create one by clicking
            here !
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInBox;
