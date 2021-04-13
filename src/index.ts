import { NetJSONGraphConfigType, NetJSONDataType } from "./config";

class NetJSONGraph {
  data: NetJSONDataType | string;
  config: NetJSONGraphConfigType;
  element: HTMLElement | null | undefined;

  constructor(data: string | NetJSONDataType, config: NetJSONGraphConfigType) {
    this.data = data;
    this.config = config;
    this.element = this.getElement();
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

  private initializeLeaflet(mapOptions: NetJSONGraphConfigType["mapOptions"]) {}

  public async render() {
    const data = await this.parseData(this.data);
    const element = this.getElement();
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
