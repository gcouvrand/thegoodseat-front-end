import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Textfield } from "../../components/Textfield";
import { updateUserInfos } from "../../redux/Reducer/loginSlice";
import { SignInApi } from "../../services/ApiCall";
import "./index.css";

interface IEmail {
  email: string,
}
interface IPassword {
  password: string,
}

function SignInBox() {
  const [email, setEmail] = useState<IEmail>({ email: "" });
  const [password, setPassword] = useState<IPassword>({ password: "" });
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e: { target: { value: SetStateAction<IEmail>; }; }) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: { target: { value: SetStateAction<IPassword>; }; }) => {
    setPassword(e.target.value);
  };

  const clearError = () => {
    setErrorMessage(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    try {
      e.preventDefault();
      const data = await SignInApi(email, password);

      if (data) {
        dispatch(
          updateUserInfos({
            userId: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            token: data.accessToken,
            loggedIn: true,
          })
        );
        navigate("/user");
      }
    } catch (e) {
      setErrorMessage(true);
    }
  };

  return (
    <div className="wrapper">
      <FormControl isInvalid={errorMessage}>
        <Stack spacing={5}>
          <Input
            variant="outline"
            placeholder="email"
            id="email"
            type="email"
            onChange={(e) => onChangeEmail}
          />
          <Input
            variant="outline"
            placeholder="password"
            id="password"
            type="password"
            onChange={(e) => onChangePassword}
          />
        {errorMessage ? (
          <FormErrorMessage>Can't login. Check your credentials</FormErrorMessage>
        ) : (
          ""
        )}

        <Button colorScheme="facebook" onClick={handleSubmit}>Sign in</Button>
        </Stack>


        <div className="signin--link-to-sign-up">
          <Link to="/signup">
            If you don't already have an account, you can create one by clicking
            here !
          </Link>
        </div>
      </FormControl>
    </div>
  );
}

export default SignInBox;
