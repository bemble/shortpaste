export default class Config {
  static domain: string = "";

  static get apiKey(): string {
    return process.env.REACT_APP_API_KEY || "%shortpaste-api-key-placeholder%";
  }

  static get apiBaseURL(): string {
    let baseURL = process.env.PUBLIC_URL;
    if (baseURL === "/") {
      baseURL = "";
    }
    baseURL += "/api/v1";
    return baseURL;
  }

  static get baseURL(): string {
    let baseURL = process.env.PUBLIC_URL;
    if (baseURL === "/") {
      baseURL = "";
    }
    return `${window.location.origin}${baseURL}`;
  }

  static get shortenURL(): string {
    if (this.domain !== "") {
      return this.domain;
    }
    return this.baseURL;
  }
}
