export type Config = {
  domain: string;
  version: string;
};

export type Status = {
  status: "up" | "down";
};

export type Link = {
  id: string;
  link: string;
  hit_count: number;
  created_at: string;
  updated_at: string;
};

export type File = {
  id: string;
  name: string;
  mime: string;
  hit_count: number;
  download_count: number;
  created_at: string;
  updated_at: string;
};

export type Text = {
  id: string;
  text: string;
  type: string;
  no_highlight: boolean;
  hit_count: number;
  download_count: number;
  created_at: string;
  updated_at: string;
};
