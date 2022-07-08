import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../../pages/redux/Reducer/LoginSlice";
import { SignInApi } from "../../services/ApiCall";
import "./index.css";

function SignInBox() {

  const [email, setEmail] = useState({'email': ''})
  const [password, setPassword] = useState({'password': ''})
  const dispatch = useDispatch()

  const onChangeEmail = (e: any) => {
      setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
      setPassword(e.target.value);
  }

  const handleSubmit = async (e: any) => {
    try {
        e.preventDefault()
        console.log(email)
        console.log(password)
        const data = await SignInApi(email, password)
        if(data) {
            dispatch(Login({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
            }))
        } 

        console.log(data)
        }
        catch (e: any) {
            console.log(e)
    }
}
  
  return (
    <div className="wrapper">
      <form className="signin--form">
        <div className="signin--textfield">
          <input type="text" required onChange={onChangeEmail}/>
          <span className="signin--textfield-highlight"></span>
          <span className="signin--textfield-bar"></span>
          <label>email</label>
        </div>

        <div className="signin--textfield">
          <input type="text" required onChange={onChangePassword}/>
          <span className="signin--textfield-highlight"></span>
          <span className="signin--textfield-bar"></span>
          <label>password</label>
        </div>
        <button className="signin--button" onClick={handleSubmit}>SIGN IN</button>
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
