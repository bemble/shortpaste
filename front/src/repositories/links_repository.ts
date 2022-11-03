import { api, config } from "../core";
import { Link as ShortPasteLink } from "../common/api.types";
import { Link as ShortLink } from "../common/data.types";

export default class LinksRepository {
  static async getAll(): Promise<Record<string, ShortLink>> {
    const links: Record<string, ShortLink> = {};

    const { data: apiLinks } = await api.getLinks();
    apiLinks.forEach((link) => {
      links[link.id] = { ...link, short_url: this.getShortURL(link) };
    });

    return links;
  }

  static async add(l: Partial<ShortPasteLink>): Promise<ShortLink> {
    const { data: link } = await api.addLink(l);
    return { ...link, short_url: this.getShortURL(link) };
  }

  static async delete(l: ShortLink): Promise<void> {
    await api.deleteLink(l.id);
  }

  static getShortURL(l: ShortPasteLink): string {
    return `${config.shortenURL}/l/${l.id}`;
  }
}
