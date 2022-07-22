import instance from "./instance";

const getCategories = () => {
    const url = "/categories"
    return instance.get(url)
}


export {getCategories}
