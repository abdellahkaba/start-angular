export interface Product {
    id : string,
    name : string,
    price : number,
    promotion : boolean
}

//Class pagination

export interface PageProduct {
    products : Product[]
    page : number
    size : number
    totalPages : number
}
