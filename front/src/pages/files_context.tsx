import { createContext } from "react";
import { File as ShortFile } from "../common/data.types";

const FilesContext = createContext<Record<string, ShortFile>>({});

export default FilesContext;