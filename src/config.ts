import { LatLngExpression } from "leaflet";


export type NetJSONGraphConfigType = {
  element: HTMLElement | string | undefined;
  type?: "graph" | "map";
  mapOptions?: {
    tileProvider: string;
    center: LatLngExpression;
    zoom: number;
  };
};

export type Node = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type Link = {
  source: string;
  target: string;
  cost: number;
};

export type NetJSONDataType = {
  type: string;
  date: string;
  label: string;
  links: Link[];
  metric: string;
  nodes: Node[];
  protocol: string;
  version: string;
};
