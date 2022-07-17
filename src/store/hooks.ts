import { useContext } from "react"
import StoreContext from "./Context"

const useStore = () => {
    return useContext(StoreContext)
}

export {useStore}