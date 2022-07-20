import instance from "./instance";

const getProduct = () => {
    const url = "/product"
    return instance.get(url)
}
const getProducts = () => {
    const url = "/products"
    return instance.get(url)
}

const createProduct = (data:any) => {
    const url = "/products"
    return instance.post(url, data)
}

export {getProduct, getProducts, createProduct}
