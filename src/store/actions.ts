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
const setLoading = () => {
    return {
        type: 'set_loading'
    }
}

export {getProducts, getProduct, setLoading}