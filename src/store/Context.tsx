import { createContext } from "react";
import { StoreContextProps } from "../types/IContextProps";

const StoreContext = createContext({} as StoreContextProps)

export default StoreContext