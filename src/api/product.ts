import instance from "./instance";

const getProduct = (id : number) => {
    const url = `/products/${id}`
    return instance.get(url)
}
const getProducts = () => {
    const url = "/products?_sort=id&_order=asc"
    return instance.get(url)
}
const getProductsByCategory = (id : number) => {
    const url = `/categories/${id}?_embed=products`
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

export {getProduct, getProducts,getProductsByCategory, createProduct,updateProduct, updateProductOneField,}
