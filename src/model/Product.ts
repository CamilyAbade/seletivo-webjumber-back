export class Product{
    constructor(
        private id: string,
        private name: string,
        private SKU: string,
        private price: string,
        private description: string,
        private qty: number,
        private category: JSON
    ){}


    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getSKU(): string {
        return this.SKU
    }

    public getPrice(): string {
        return this.price
    }

    public getDescription(): string {
        return this.description
    }

    public getQty(): number {
        return this.qty
    }

    public getCategory(): JSON {
        return  this.category
    }


    public setName(name: string) {
        this.name = name
    }
    
    public setSKU(SKU: string) {
        this.SKU = SKU
    }

    public setPrice(price: string) {
        this.price = price
    }

    public setDescription(description: string) {
        this.description = description
    }

    public setQty(qty: number) {
        this.qty = qty
    }

    public setCategory(category: JSON) {
        this.category = category
    }


    public static toProduct(data?: any): Product | undefined{
        return(data && new Product(
            data.id,
            data.name,
            data.SKU,
            data.price,
            data.description,
            data.qty,
            data.category
        ))
    }

}

export interface productInputDTO{
     id?: string,
     name: string,
     SKU: string,
     price: string,
     description: string,
     qty: number,
     category: JSON
}

export interface productOutputDTO{
     id: string,
     name: string,
     SKU: string,
     price: string,
     description: string,
     qty: number,
     category: JSON
}


export interface productDeleteDTO{
    id: string
}
