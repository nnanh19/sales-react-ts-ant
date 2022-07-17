import { useReducer } from "react";
import { StoreProvider } from "../types/IContextProps";
import StoreContext from "./Context"

const Provider: React.FC<StoreProvider> = ({reducer, initState, children }) =>{
    
    const [state, dispatch] = useReducer(reducer, initState)
    const value = {state, dispatch}
    return (
        <StoreContext.Provider value= {value}> 
            {children}
        </StoreContext.Provider>
    )
}
export default Provider