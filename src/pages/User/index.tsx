import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import Geocode from "react-geocode";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetOffersApi } from "../../services/ApiCall";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const center = { lat: 48.8584, lng: 2.2945 };
const libraries: any = ['places'];

function User() {
  const { isLoaded } = useJsApiLoader({
    // @ts-ignore
    googleMapsApiKey: "AIzaSyAK4AZwL2SORNbrhOUfc2ZoplrgSZUNIeY",
    libraries,
  });

  // @ts-ignore
  Geocode.setApiKey("AIzaSyAK4AZwL2SORNbrhOUfc2ZoplrgSZUNIeY");
  const [, setMap]: any = useState(null);
  const [isOffersArrayLoading, setIsOffersArrayLoading]: any = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const distance = useRef();
  const startLat: any = useRef();
  const startLong: any = useRef();
  const endLat: any = useRef();
  const endLong: any = useRef();
  const startAddress = useRef();
  const endAddress = useRef();
  const startCountry = useRef();
  const endCountry = useRef();

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

  function generateRandomInteger(max: any) {
    return Math.floor(Math.random() * max + 1);
  }

  useEffect(() => {
    setIsOffersArrayLoading(false);
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
    startAddress.current = originRef.current.value;
    endAddress.current = destiantionRef.current.value;
    stops.forEach((element) => {
      element.address = destiantionRef.current.value;
    });

    await Geocode.fromAddress(originRef.current.value).then((response: any) => {
      const { lat, lng } = response.results[0].geometry.location;
      startLat.current = lat;
      startLong.current = lng;
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
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100%"
    >
      <Box p={4} bgColor="white" shadow="base" w="100%" zIndex="1">
        <HStack
          spacing={2}
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box flexGrow={{ base: 0, md: 1 }}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Starting address"
                ref={originRef}
              />
            </Autocomplete>
          </Box>
          <ArrowForwardIcon w={7} h={7} />{" "}
          <Box flexGrow={{ base: 0, md: 1 }}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Arrival address"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>
          <Button
            size="sm"
            colorScheme="facebook"
            type="submit"
            onClick={calculateRoute}
          >
            Get Offers
          </Button>
        </HStack>
      </Box>
      <Stack
        spacing={{ base: "10px", md: "70px" }}
        m={5}
        marginLeft={{ base: "50px" }}
        width="90%"
        direction={{ base: "column", md: "row" }}
      >
        {offers
          ? offers.map(function (each: any) {
              return (
                <Stat
                  border="solid"
                  borderColor="#EDF2F7"
                  borderWidth="1px"
                  w={250}
                  borderRadius={15}
                  p={1}
                  backgroundColor="#EDF2F7"
                  boxShadow="0 10px 30px #CBD5E0"
                >
                  <StatLabel
                    fontSize={{ base: "12px", md: "18px" }}
                    fontWeight={600}
                  >
                    Gary
                  </StatLabel>
                  <StatNumber
                    fontSize={{ base: "14px", md: "20px" }}
                    color="green"
                  >
                    {each.displayPrice}
                  </StatNumber>
                  <StatHelpText fontSize={{ base: "12px", md: "18px" }}>
                    Temps d'attente estimée : {generateRandomInteger(60)}{" "}
                    minutes
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
      </Stack>
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
          onLoad={(map) => setMap(map)}
          onClick={(e) => {}}
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
