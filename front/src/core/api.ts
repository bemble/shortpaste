import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  Link as ShortPasteLink,
  Text as ShortPasteText,
  File as ShortPasteFile,
  Status,
} from "../common/api.types";
import config from "./config";

class Api {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      baseURL: config.apiBaseURL,
      headers: {
        "x-api-key": config.apiKey,
      },
    });

    this._axiosInstance.interceptors.response.use(
      (response) => {
        if ([200, 201, 204].indexOf(response.status) === -1) {
          return Promise.reject(response);
        }
        return response;
      },
      (error) => error
    );
  }

  public getLinks(): Promise<AxiosResponse<ShortPasteLink[]>> {
    return this._axiosInstance.get<ShortPasteLink[]>("/links");
  }

  public addLink(
    l: Partial<ShortPasteLink>
  ): Promise<AxiosResponse<ShortPasteLink>> {
    return this._axiosInstance.post<ShortPasteLink>("/links", l);
  }

  public deleteLink(id: string): Promise<AxiosResponse<void>> {
    return this._axiosInstance.delete<void>(`/links/${id}`);
  }

  public getTexts(): Promise<AxiosResponse<ShortPasteText[]>> {
    return this._axiosInstance.get<ShortPasteText[]>("/texts");
  }

  public addText(
    t: Partial<ShortPasteText>
  ): Promise<AxiosResponse<ShortPasteText>> {
    return this._axiosInstance.post<ShortPasteText>("/texts", t);
  }

  public deleteText(id: string): Promise<AxiosResponse<void>> {
    return this._axiosInstance.delete<void>(`/texts/${id}`);
  }

  public getFiles(): Promise<AxiosResponse<ShortPasteFile[]>> {
    return this._axiosInstance.get<ShortPasteFile[]>("/files");
  }

  public addFile(f: File): Promise<AxiosResponse<ShortPasteFile>> {
    const formData = new FormData();
    formData.append("file", f);

    return this._axiosInstance.post<ShortPasteFile>("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public deleteFile(id: string): Promise<AxiosResponse<void>> {
    return this._axiosInstance.delete<void>(`/files/${id}`);
  }

  public getStatus(): Promise<AxiosResponse<Status>> {
    return this._axiosInstance.get<Status>("/status");
  }
}

export default new Api();
