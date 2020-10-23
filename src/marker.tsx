import * as React from "react";
import * as NativeMaps from "react-native-maps";
import { Marker, MarkerProps } from "@react-google-maps/api";

function mapToApiProps(inProps): MarkerProps {
  return {
    position: {
      lat: inProps.coordinate.latitude,
      lng: inProps.coordinate.longitude
    },
    onClick: inProps.onPress,
    opacity: inProps.opacity,
    title: inProps.title
  };
}

export default function MarkerComponent(
  props: NativeMaps.MarkerProps
): React.ReactNode {
  return <Marker {...mapToApiProps(props)} />;
}
