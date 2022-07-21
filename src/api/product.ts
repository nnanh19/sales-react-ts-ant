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
const updateProductOneField = (data:any) => {
    const url = `/products/${data.id}`
    return instance.patch(url, data.status)
}
const updateProduct = (data:any) => {
    const url = `/products/${data.id}`
    return instance.put(url, data)
}

export {getProduct, getProducts, createProduct,updateProduct, updateProductOneField}
