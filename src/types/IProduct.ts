export interface IProduct {
    id?: number,
    name: string,
    image: any,
    desc: string,
    price: number,
    status: any,
    categoryId: number,
    promotion?: number
}