import { Reducer } from "react";
import { StoreActions, StoreInitReducer } from "../types/IContextProps";
import Provider from "./Provider";
import { GET_PRODUCT, GET_PRODUCTS, SET_Product_Image } from "./constants";
const StoreController: any = ({children} :any) => {

    const initState: StoreInitReducer = {
        product: '',
        products : [],
        productImage: ''
    }

    const reducer: Reducer<any, StoreActions > = (state, action) => {
        switch (action.type) {
            case GET_PRODUCT:
                return {
                    product: 'anh'
                }
            case GET_PRODUCTS:
                return {
                    products:  action.payload
            }
            case SET_Product_Image:
                return {
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