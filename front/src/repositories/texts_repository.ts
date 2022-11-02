import { api, config } from "../core";
import { Text as ShortPasteText } from "../common/api.types";
import { Text as ShortText } from "../common/data.types";

export default class TextsRepository {
  static async getAll(): Promise<Record<string, ShortText>> {
    const texts: Record<string, ShortText> = {};

    const { data: apiTexts } = await api.getTexts();
    apiTexts.forEach((text) => {
      texts[text.id] = { ...text, short_url: this.getShortURL(text) };
    });

    return texts;
  }

  static async add(t: Partial<ShortPasteText>): Promise<ShortText> {
    const { data: text } = await api.addText(t);
    return { ...text, short_url: this.getShortURL(text) };
  }

  static async delete(t: ShortText): Promise<void> {
    await api.deleteText(t.id);
  }

  static getShortURL(t: ShortPasteText): string {
    return `${config.baseURL}/t/${t.id}`;
  }
}
