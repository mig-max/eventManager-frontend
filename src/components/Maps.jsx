/* eslint-disable react/prop-types */
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


const libraries = ["places"];
const mapContainerStyle = {
  width: "522px", 
  height: "300px",
};

function Maps({ latitude, longitude }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDPv7elQ1AbUD8wKguP3J1La09U5BCwykA", 
    libraries,
  });

  if (loadError) return <div>Map loading error</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Maps
