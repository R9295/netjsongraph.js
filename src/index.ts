import { NetJSONGraphConfigType, NetJSONDataType } from "./config";
import * as L from "leaflet";

class NetJSONGraph {
  data: NetJSONDataType | string;
  config: NetJSONGraphConfigType;
  element: HTMLElement | null | undefined;
  type: "graph" | "map";

  constructor(data: string | NetJSONDataType, config: NetJSONGraphConfigType) {
    this.data = data;
    this.config = config;
    this.element = this.getElement();
    this.type = config.type || "graph";
    return this;
  }

  private async parseData(data: string | NetJSONDataType) {
    if (typeof data === "string") {
      let fetchedData = await fetch(data, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      fetchedData = await fetchedData.json();
      // TODO: handle exceptions
      return (fetchedData as unknown) as NetJSONDataType;
    } else {
      return data;
    }
  }

  private initializeLeaflet() {
    if (this.config.mapOptions) {
      const { center, zoom, tileProvider, maxZoom } = this.config.mapOptions;
      const map = L.map(this.element || "body").setView(center, zoom);
      L.tileLayer(tileProvider, {
        maxZoom: maxZoom || 18
      }).addTo(map);
      return map;
    } else {
      throw new Error('Map options are required when type is "map"');
    }
  }

  public async render() {
    const data = await this.parseData(this.data);
    if (this.type === "map") {
      const map = this.initializeLeaflet();
    }
  }

  public getElement() {
    if (this.config.element === null || this.config.element === undefined) {
      return document.getElementsByTagName("body")[0];
    } else {
      return typeof this.config.element === "string"
        ? document.getElementById(this.config.element)
        : this.config.element;
    }
  }
}
export default NetJSONGraph;
