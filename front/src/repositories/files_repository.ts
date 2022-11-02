import { api, config } from "../core";
import { File as ShortPasteFile } from "../common/api.types";
import { File as ShortFile } from "../common/data.types";

export default class FilesRepository {
  static async getAll(): Promise<Record<string, ShortFile>> {
    const files: Record<string, ShortFile> = {};

    const { data: apiFiles } = await api.getFiles();
    apiFiles.forEach((file) => {
      files[file.id] = { ...file, short_url: this.getShortURL(file) };
    });

    return files;
  }

  static async add(f: File): Promise<ShortFile> {
    const { data: file } = await api.addFile(f);
    return { ...file, short_url: this.getShortURL(file) };
  }

  static async delete(f: ShortFile): Promise<void> {
    await api.deleteFile(f.id);
  }

  static getShortURL(f: ShortPasteFile): string {
    return `${config.baseURL}/f/${f.id}`;
  }
}
