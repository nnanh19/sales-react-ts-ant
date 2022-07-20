import { IProduct } from "../types"

const getProducts = (payload:IProduct[]) => {
    return {
        type: 'get_products',
        payload
    }
}
const getProduct = (payload:IProduct) => {
    return {
        type: 'get_product',
        payload
    }
}
const setProductImage = (payload: string) => {
    return {
        type: 'set_product_image',
        payload
    }
}

export {getProducts, getProduct, setProductImage}