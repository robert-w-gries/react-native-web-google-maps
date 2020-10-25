import * as React from "react";
import * as NativeMaps from "react-native-maps";
import { Marker, MarkerProps } from "@react-google-maps/api";
import Callout from "./callout";

export interface WebMarkerProps extends NativeMaps.MarkerProps {
  children: React.ReactNode;
}

function mapToApiProps(inProps): MarkerProps {
  return {
    position: {
      lat: inProps.coordinate.latitude,
      lng: inProps.coordinate.longitude
    },
    opacity: inProps.opacity,
    title: inProps.title
  };
}

const defaultCallout = (title?: string, description?: string) => {
  if (!title && !description) return null;
  return (
    <Callout>
      <div>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>{title}</div>
        <div style={{ textAlign: "center" }}>{description}</div>
      </div>
    </Callout>
  );
};

const MarkerComponent: React.FC<WebMarkerProps> = props => {
  const [visibleInfoWindow, setVisibleInfoWindow] = React.useState(false);

  // Find child Callout or create a default one if necessary
  let callout: React.ReactNode | null = null;
  React.Children.forEach(props.children, (child: React.ReactElement) => {
    if (child.type === Callout) {
      callout = child;
    }
  });
  callout = callout || defaultCallout(props.title, props.description);

  // Ensure callout is displayed after marker click
  const onClick = e => {
    setVisibleInfoWindow(!visibleInfoWindow);
    if (props.onPress) {
      props.onPress(e);
    }
  };

  return (
    <Marker {...mapToApiProps(props)} onClick={onClick}>
      {visibleInfoWindow ? callout : null}
    </Marker>
  );
};

export default MarkerComponent;
