import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Textfield from "../../components/Textfield";
import { SignInApi, SignUpApi } from "../../services/ApiCall";
import "./index.css";

function SignUpBox() {
  const [email, setEmail] = useState({ email: "" });
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState({ password: "" });
  const [errorPassword, setErrorPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({ phoneNumber: "" });
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [lastName, setLastName] = useState({ lastName: "" });
  const [errorLastName, setErrorLastName] = useState(false);
  const [firstName, setFirstName] = useState({ firstName: "" });
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
    if (!e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
    if (
      !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g)
    ) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  const onChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
    if (!e.target.value.match(/^\+(?:[0-9]●?){6,14}[0-9]$/g)) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false);
    }
  };

  const onChangeLastName = (e: any) => {
    setLastName(e.target.value);
    if (!e.target.value.match(/^[a-zA-Z]{3,}$/g)) {
      setErrorLastName(true);
    } else {
      setErrorLastName(false);
    }
  };

  const onChangeFirstName = (e: any) => {
    setFirstName(e.target.value);
    if (!e.target.value.match(/^[a-zA-Z]{3,}$/g)) {
      setErrorFirstName(true);
    } else {
      setErrorFirstName(false);
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (
        email.email === "" ||
        password.password == "" ||
        phoneNumber.phoneNumber == "" ||
        lastName.lastName == "" ||
        firstName.firstName == ""
      ) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
        const data = await SignUpApi(
          email,
          password,
          phoneNumber,
          lastName,
          firstName
        );

        if (data) {
          setConfirmationMessage(true);
        }
      }
    } catch (e: any) {}
  };

  return (
    <div className="wrapper">
      <form className="signup--form">
        <Textfield onblur={onChangeEmail} label="email" type="text" />
        {errorEmail ? (
          <p className="input--error-message">
            Please enter a valid email adress
          </p>
        ) : null}

        <Textfield onblur={onChangePassword} label="password" type="password" />

        {errorPassword ? (
          <p className="input--error-message">
            Password needs to have at least 6 characters and at least 1 upper
            character and 1 number
          </p>
        ) : null}

        <Textfield
          onblur={onChangePhoneNumber}
          label="phone number"
          type="text"
        />

        {errorPhoneNumber ? (
          <p className="input--error-message">
            Phone number needs to be correct and to start with the international
            code
          </p>
        ) : null}

        <Textfield onblur={onChangeLastName} label="last name" type="text" />

        {errorLastName ? (
          <p className="input--error-message">
            Last name needs to contain at least 3 characters. Only letters
            allowed
          </p>
        ) : null}

        <Textfield onblur={onChangeFirstName} label="first name" type="text" />

        {errorFirstName ? (
          <p className="input--error-message">
            First name needs to contain at least 3 characters. Only letters
            allowed
          </p>
        ) : null}

        {errorMessage ? (
          <p className="signin--form-error">You need to fill all inputs</p>
        ) : null}

        {confirmationMessage ? (
          <p className="signin--form-confirmation">
            You successfully created a new account ! You can now login on the
            sign in page with your credentials
          </p>
        ) : (
          <button className="signup--button" onClick={handleSubmit}>
            SIGN UP
          </button>
        )}

        <div className="signup--link-to-sign-in">
          <Link to="/">
            If you already have an account, go to the login page by clicking
            here !
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpBox;
