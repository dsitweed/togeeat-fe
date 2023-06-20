import { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const apiKey = "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8";

export const Map = () => {
  const [pos, setPos] = useState<{ lat: number; lng: number }>();

  //   const onClick = useCallback(function onLoad(mapInstance: any) {
  //     const lat = mapInstance.latLng.lat();
  //     const lng = mapInstance.latLng.lng();

  //     console.log("Kinh độ:", lng);
  //     console.log("Vĩ độ:", lat);
  //   }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos);
        setPos(pos);
      });
    }
  }, []);

  return pos ? (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={pos} zoom={30}>
        {/* Child components, such as markers, info windows, etc. */}
        <MarkerF
          draggable
          position={pos}
          onDragEnd={(e) => {
            console.log(e.latLng?.toJSON());
          }}
        />
      </GoogleMap>
    </LoadScript>
  ) : null;
};

export default Map;
