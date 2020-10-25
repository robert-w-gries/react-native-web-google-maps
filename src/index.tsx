import * as React from "react";
import { Camera, MapViewProps, Region } from "react-native-maps";
import {
  useJsApiLoader,
  GoogleMap,
  GoogleMapProps
} from "@react-google-maps/api";
import Callout from "./callout";
import Marker from "./marker";

interface WebMapViewProps extends MapViewProps {
  children?: React.ReactNode;
  googleMapsApiKey: string;
}

function mapToApiProps(inProps: MapViewProps): GoogleMapProps {
  return {
    center: getCenter(
      inProps.camera,
      inProps.initialCamera,
      inProps.region,
      inProps.initialRegion
    ),
    zoom: inProps.camera ? inProps.camera.zoom : 0,
    tilt: inProps.camera ? inProps.camera.pitch : 0,
    heading: inProps.camera ? inProps.camera.heading : 0,
    mapContainerStyle:
      (inProps.style as React.CSSProperties) || styles.container,
    onLoad: inProps.onMapReady
  };
}

export default function MapView({
  children,
  googleMapsApiKey,
  ...props
}: WebMapViewProps): React.ReactNode {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey
  });

  const renderMap = () => (
    <GoogleMap {...mapToApiProps(props)}>{children}</GoogleMap>
  );

  if (loadError) {
    console.log(loadError);
    return null;
  }

  return isLoaded ? renderMap() : null;
}

function getCenter(
  camera?: Camera,
  initialCamera?: Camera,
  region?: Region,
  initialRegion?: Region
): google.maps.LatLngLiteral | undefined {
  if (camera) {
    return { lat: camera.center.latitude, lng: camera.center.longitude };
  } else if (initialCamera) {
    return {
      lat: initialCamera.center.latitude,
      lng: initialCamera.center.longitude
    };
  } else if (region) {
    return { lat: region.latitude, lng: region.longitude };
  } else if (initialRegion) {
    return { lat: initialRegion.latitude, lng: initialRegion.longitude };
  }
}

const styles = {
  container: {
    height: "100%",
    width: "100%"
  }
};

export { Callout, Marker };
