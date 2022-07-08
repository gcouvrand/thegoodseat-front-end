import { Link } from "react-router-dom";
import "./index.css";

function SignUpBox() {
  return (
    <div className="wrapper">
      <form className="signup--form">
        <div className="signup--textfield">
          <input type="text" required />
          <span className="signup--textfield-highlight"></span>
          <span className="signup--textfield-bar"></span>
          <label>email</label>
        </div>

        <div className="signup--textfield">
          <input type="text" required />
          <span className="signup--textfield-highlight"></span>
          <span className="signup--textfield-bar"></span>
          <label>password</label>
        </div>

        <div className="signup--textfield">
          <input type="text" required />
          <span className="signup--textfield-highlight"></span>
          <span className="signup--textfield-bar"></span>
          <label>phone number</label>
        </div>

        <div className="signup--textfield">
          <input type="text" required />
          <span className="signup--textfield-highlight"></span>
          <span className="signup--textfield-bar"></span>
          <label>last name</label>
        </div>

        <div className="signup--textfield">
          <input type="text" required />
          <span className="signup--textfield-highlight"></span>
          <span className="signup--textfield-bar"></span>
          <label>first name</label>
        </div>

        <button className="signup--button">SIGN UP</button>
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
