import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Input,
  SkeletonText,
  Spinner,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";

import Geocode from "react-geocode";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Data,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetOffersApi } from "../../services/ApiCall";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const center = { lat: 48.8584, lng: 2.2945 };

function User() {

  const { isLoaded } = useJsApiLoader ({
  // @ts-ignore
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  
    // @ts-ignore
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const [map, setMap]: any = useState(null)
  const [isOffersArrayLoading, setIsOffersArrayLoading]: any = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const distance: any = useRef();
  const [duration, setDuration] = useState("");
  const startLat: any = useRef();
  const startLong: any = useRef();
  const endLat: any = useRef();
  const endLong: any = useRef();
  const startAddress: any = useRef();
  const endAddress: any = useRef();
  const startCountry: any = useRef();
  const endCountry: any = useRef();

  const salutsalut = "salutsalut";

  const [offers, setOffers]: any = useState(null);

  const token = useSelector((state: any) => state.loginReducer.token);

  const userId = useSelector((state: any) => state.loginReducer.userId);
  const providerList = ["mysam"];
  const nbrOfPassenger = 1;
  const stops = [
    {
      latitude: null,
      longitude: null,
      address: "",
    },
  ];

  const originRef: any = useRef();
  const destiantionRef: any = useRef();

  function clearRoute() {
    setDirectionsResponse(null)
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  useEffect(() => {
    setTimeout(function () {
      setIsOffersArrayLoading(false);
      clearRoute();
    }, 100);
  }, [offers]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    setIsOffersArrayLoading(true);
    const directionsService = new google.maps.DirectionsService();
    const results: any = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    distance.current = results.routes[0].legs[0].distance.value.toString();
    setDuration(results.routes[0].legs[0].duration.text);
    startAddress.current = originRef.current.value;
    endAddress.current = destiantionRef.current.value;
    stops.forEach((element) => {
      element.address = destiantionRef.current.value;
    });

    


    await Geocode.fromAddress(originRef.current.value).then((response: any) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      startLat.current = lat;
      startLong.current = lng;
      console.log(startLat);
    });

    await Geocode.fromAddress(destiantionRef.current.value).then(
      (response: any) => {
        const { lat, lng } = response.results[0].geometry.location;
        endLat.current = lat;
        endLong.current = lng;
        stops.forEach((element) => {
          element.latitude = lat;
        });
        stops.forEach((element) => {
          element.longitude = lng;
        });
      }
    );

    await Geocode.fromLatLng(
      startLat.current.toString(),
      startLong.current.toString()
    ).then((response: any) => {
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "country":
              startCountry.current = response.results[0].address_components[
                i
              ].long_name
                .substring(0, 2)
                .toUpperCase();
              break;
          }
        }
      }
    });

    await Geocode.fromLatLng(
      endLat.current.toString(),
      endLong.current.toString()
    ).then((response: any) => {
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "country":
              endCountry.current = response.results[0].address_components[
                i
              ].long_name
                .substring(0, 2)
                .toUpperCase();
              break;
          }
        }
      }
    });
    const data = await GetOffersApi(
      startLat.current,
      startLong.current,
      startAddress.current,
      startCountry.current,
      endLat.current,
      endLong.current,
      endAddress.current,
      endCountry.current,
      distance.current,
      userId,
      providerList,
      nbrOfPassenger,
      stops,
      token
    );

    setOffers(data);
    console.log(data);
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100%"
    >
      <Box
        p={4}
        bgColor="white"
        shadow="base"
        w="100%"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between" flexDirection={{base:"column", md:"row"}}>
          <Box flexGrow={{base: 0, md: 1}}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Starting address"
                ref={originRef}
              />
            </Autocomplete>
          </Box>
          <div>
            {" "}
            <ArrowForwardIcon w={7} h={7} />{" "}
          </div>
          <Box flexGrow={{base: 0, md: 1}}>
                        <Autocomplete>
              <Input
                type="text"
                placeholder="Arrival address"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

            <Button
              marginTop={5}
              colorScheme="facebook"
              type="submit"
              onClick={calculateRoute}
            >
              Get Offers
            </Button>
        </HStack>
        <HStack spacing="50px" m={5}>
          {offers
            ? offers.map(function (each: any) {
                return (
                  <Stat border="solid" borderWidth="2px" w={250} borderRadius={15} p={3}>
                    <StatLabel fontSize={16} fontWeight={600}>Gary</StatLabel>
                    <StatNumber color="green">{each.displayPrice}</StatNumber>
                    <StatHelpText>
                      Temps d'attente estimée : 20 minutes
                    </StatHelpText>
                  </Stat>
                );
              })
            : null}

          {isOffersArrayLoading ? (
            <Spinner
              m={5}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
          ) : null}
        </HStack>
      </Box>
      <Box h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default User;
