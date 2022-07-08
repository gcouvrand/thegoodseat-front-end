import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Textfield from "../../components/Textfield";
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
        <Textfield
          onchange={onChangeEmail}
          onfocus={clearError}
          label='email'
        />
        <Textfield
          onchange={onChangePassword}
          onfocus={clearError}
          label='password'
        />

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
