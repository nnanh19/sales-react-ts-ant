import { Dispatch, Reducer } from "react"
import { ICategory } from "./ICategory";
import { IProduct } from "./IProduct";

export interface StoreActions {
    type: string,
    payload: any,
    value?: any
}
export interface StoreInitReducer{
    product : any,
    products: IProduct[],
    productImage: string,
    categories: ICategory[],
}

export interface StoreProvider{
    reducer: Reducer<StoreInitReducer, StoreActions>,
    initState: StoreInitReducer;
    children?:any
}
export interface StoreContextProps {
    state: StoreInitReducer,
    dispatch: Dispatch<StoreActions>
}
