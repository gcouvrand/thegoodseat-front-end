import axios from "axios";
import { useSelector } from "react-redux";

const Client = axios.create({
  baseURL: "http://localhost:3000",
});

export async function SignInApi(email: any, password: any) {
  const loginData = {
    email: email,
    password: password,
  };
  console.log(loginData);

  return Client.post("/auth/signin", loginData).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export async function SignUpApi(
  email: any,
  password: any,
  phoneNumber: any,
  lastName: any,
  firstName: any
) {
  const signUpData = {
    email: email,
    password: password,
    phone_number: phoneNumber,
    lastName: lastName,
    firstName: firstName,
    isPhoneNumberVerified: true,
  };
  console.log(signUpData);

  return Client.post("/auth/signup", signUpData).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

export async function GetOffersApi(
  startLat: any,
  startLong: any,
  startAddress: any,
  startCountry: any,
  endLat: any,
  endLong: any,
  endAddress: any,
  endCountry: any,
  distance: any,
  userId: any,
  providerList: any,
  nbrOfPassenger: any,
  stops: any,
  token: any
) {
  const getOffersData = {
    startLat: startLat,
    startLong: startLong,
    startAddress: startAddress,
    startCountry: startCountry,
    endLat: endLat,
    endLong: endLong,
    endAddress: endAddress,
    endCountry: endCountry,
    distance: distance,
    userId: userId,
    providerList: providerList,
    nbrOfPassenger: nbrOfPassenger,
    stops: stops,
    token: token
  };

  console.log(getOffersData);
  return Client.post("/offers/get-offers", getOffersData).then((response) => {
    return response.data;
  });
}
