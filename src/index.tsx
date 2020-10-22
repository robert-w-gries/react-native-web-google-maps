import * as React from 'react';
import { Camera, MapViewProps, Region } from 'react-native-maps';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

interface WebMapViewProps extends MapViewProps{
  children?: React.ReactNode,
  googleMapsApiKey: string,
}

export default function MapView({ children, googleMapsApiKey, ...props }: WebMapViewProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
  });

  const center = getCenter(props.camera, props.initialCamera, props.region, props.initialRegion);
  const zoom = props.camera ? props.camera.zoom : 0;
  const tilt = props.camera ? props.camera.pitch : 0;
  const renderMap = () => (
    <GoogleMap center={center} zoom={zoom} tilt={tilt} onLoad={props.onMapReady}>
      {children}
    </GoogleMap>
  );

  if (loadError) {
    console.log(loadError);
    return null;
  }

  return isLoaded ? renderMap() : null;
}

function getCenter(camera?: Camera, initialCamera?: Camera, region?: Region, initialRegion?: Region): google.maps.LatLngLiteral | undefined {
  if (camera) {
    return { lat: camera.center.latitude, lng: camera.center.longitude };
  } else if (initialCamera) {
    return { lat: initialCamera.center.latitude, lng: initialCamera.center.longitude };
  } else if (region) {
    return { lat: region.latitude, lng: region.longitude };
  } else if (initialRegion) {
    return { lat: initialRegion.latitude, lng: initialRegion.longitude };
  }
}

/*MapView.Marker = Marker;
MapView.Polyline = Polyline;
MapView.Callout = Callout;
*/