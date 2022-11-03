import { api, config } from "../core";
import { App as ShortApp } from "../common/data.types";

export default class AppRepository {
  static async get(): Promise<ShortApp> {
    const { data: apiStatus } = await api.getStatus();
    const { data: apiConfig } = await api.getConfig();

    return { ...apiStatus, ...apiConfig };
  }
}
