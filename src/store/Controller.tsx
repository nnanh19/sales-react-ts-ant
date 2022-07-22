import { Reducer } from "react";
import { StoreActions, StoreInitReducer } from "../types/IContextProps";
import Provider from "./Provider";
import { GET_Categories, GET_PRODUCT, GET_PRODUCTS, SET_Product_Image } from "./constants";
const StoreController: any = ({children} :any) => {

    const initState: StoreInitReducer = {
        product: '',
        products : [],
        productImage: '',
        categories: []
    }

    const reducer: Reducer<any, StoreActions > = (state, action) => {
        switch (action.type) {
            case GET_PRODUCT:
                return {
                    ...state,
                    product: action.payload
                }
            case GET_PRODUCTS:
                return {
                    ...state,
                    products:  action.payload
            }
            case GET_Categories:
                return {
                    ...state,
                    categories:  action.payload
            }
            case SET_Product_Image:
                return {
                    ...state,
                    productImage: action.payload
            }
            default:
                break;
        }
    }
    return (
        <Provider reducer={reducer} initState={initState}>
            {children}
        </Provider>
    )

}

export default StoreController;