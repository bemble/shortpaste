import { createContext } from "react";
import { App as ShortApp } from "./common/data.types";

const LinksContext = createContext<ShortApp|undefined>(undefined);

export default LinksContext;