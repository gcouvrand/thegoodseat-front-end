import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpApi } from "../../services/ApiCall";
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
  const [redirectButton, setRedirectButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  let navigate = useNavigate();

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
    if (!e.target.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
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
    if (
      !e.target.value.match(/^\+(?:[0-9]●?){6,14}[0-9]$/g)) {
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
  const redirectToLoginPage = () => {
    navigate("/");
  };

  const toast = useToast();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (
        email.email === "" ||
        password.password === "" ||
        phoneNumber.phoneNumber === "" ||
        lastName.lastName === "" ||
        firstName.firstName === ""
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
          setRedirectButton(true);
          toast({
            title: "Account created !",
            description: "You can now go to the login page to sign in.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (e: any) {}
  };

  return (
    <div className="wrapper">
      <FormControl isInvalid={errorMessage}>
        <Stack spacing={5}>
          <Input
            isInvalid={errorEmail}
            variant="outline"
            placeholder="email"
            id="email"
            type="email"
            onChange={onChangeEmail}
          />

          <Input
            isInvalid={errorPassword}
            variant="outline"
            placeholder="password"
            id="password"
            type="password"
            onChange={onChangePassword}
          />

          <Input
            isInvalid={errorPhoneNumber}
            variant="outline"
            placeholder="phone number"
            id="tel"
            type="tel"
            onChange={onChangePhoneNumber}
          />

          <Input
            isInvalid={errorLastName}
            variant="outline"
            placeholder="last name"
            id="lastname"
            type="lastname"
            onChange={onChangeLastName}
          />

          <Input
            isInvalid={errorFirstName}
            variant="outline"
            placeholder="first name"
            id="firstname"
            type="firstname"
            onChange={onChangeFirstName}
          />

          {errorMessage ? (
            <FormErrorMessage>Please fill all the inputs</FormErrorMessage>
          ) : null}

          {redirectButton ? (
            <Button
              fontSize="13px"
              colorScheme="green"
              onClick={redirectToLoginPage}
            >
              Go to the login page by clicking on this button
            </Button>
          ) : (
            <Button colorScheme="facebook" onClick={handleSubmit}>
              Sign up
            </Button>
          )}
        </Stack>
      </FormControl>
    </div>
  );
}

export default SignUpBox;
