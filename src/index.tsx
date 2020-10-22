import * as React from 'react';
import { Camera, MapViewProps, Region } from 'react-native-maps';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

interface WebMapViewProps extends MapViewProps{
  children: React.ReactNode,
  googleMapsApiKey: string,
}

export default function MapView({ children, googleMapsApiKey, ...props }: WebMapViewProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey
  });

  const center = getCenter(props.camera, props.initialCamera, props.region, props.initialRegion);
  const renderMap = () => (
    <GoogleMap center={center} onLoad={props.onMapReady}>
      {children}
    </GoogleMap>
  );

  if (loadError) {
    return null;
  }

  return isLoaded ? renderMap() : null;
}

function getCenter(camera?: Camera, initialCamera?: Camera, region?: Region, initialRegion?: Region) {
  if (camera) {
    return camera.center;
  } else if (initialCamera) {
    return initialCamera.center;
  } else if (region) {
    return { latitude: region.latitude, longitude: region.longitude };
  } else if (initialRegion) {
    return { latitude: initialRegion.latitude, longitude: initialRegion.longitude };
  }
}

/*MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Callout = Callout;
*/