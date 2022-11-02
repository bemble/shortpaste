import { createContext } from "react";
import { Link as ShortLink } from "../common/data.types";

const LinksContext = createContext<Record<string, ShortLink>>({});

export default LinksContext;