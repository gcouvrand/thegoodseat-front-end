import axios from "axios";

const Client = axios.create({
  baseURL: "https://thegoodseat-back-end.herokuapp.com",
});

export async function SignInApi(email: any, password: any) {
  const loginData = {
    email: email,
    password: password,
  };

  return Client.post("/auth/signin", loginData).then((response) => {
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

  return Client.post("/auth/signup", signUpData).then((response) => {
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
    token: token,
  };

  return Client.post("/offers/get-offers", getOffersData).then((response) => {
    return response.data;
  });
}
