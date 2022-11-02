import {
  Link as ShortPasteLink,
  File as ShortPasteFile,
  Text as ShortPasteText,
} from "./api.types";

type ShortenedData = {
  short_url: string;
};

export type Link = ShortPasteLink & ShortenedData & {};

export type File = ShortPasteFile & ShortenedData & {};

export type Text = ShortPasteText & ShortenedData & {};
