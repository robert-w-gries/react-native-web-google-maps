import * as React from "react";
import * as NativeMaps from "react-native-maps";
import { InfoWindow } from "@react-google-maps/api";

export interface WebCalloutProps extends NativeMaps.MapCalloutProps {
  // Implementation detail of @react-google-maps/api
  // We need HasMarkerAnchor in order for anchors to be attached to children of Markers
  // The `anchor` prop will be overriden during runtime with ref to parent marker
  anchor?: google.maps.Marker;
}

const CalloutComponent: React.FC<WebCalloutProps> = props => {
  return <InfoWindow anchor={props.anchor}>{props.children}</InfoWindow>;
};

export default CalloutComponent;
