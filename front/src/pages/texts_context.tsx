import { createContext } from "react";
import { Text as ShortText } from "../common/data.types";

const TextsContext = createContext<Record<string, ShortText>>({});

export default TextsContext;