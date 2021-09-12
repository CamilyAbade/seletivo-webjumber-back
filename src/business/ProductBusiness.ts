import { ProdutcDataBase } from "../data/ProductDataBase";
import { InvalidInputError } from "../error/InvalidInput";
import { Product, productDeleteDTO, productInputDTO, productOutputDTO } from "../model/Product";
import { IdGenerator } from "../services/IdGenerator";

export class ProductBusiness{
    
    constructor(
        private productDataBase: ProdutcDataBase,
        private idGenerator : IdGenerator
    ){}

    async getProducts(): Promise<productOutputDTO[]>{
        return this.productDataBase.getProducts()
    }

    async postProduct(input: productInputDTO){
        
        if(!input.name || !input.SKU || !input.price || !input.description || !input.qty || !input.category){
            throw new InvalidInputError("Invalid input to register new product")
        }

        await this.productDataBase.addProduct(
            Product.toProduct({
                ...input,
                id: this.idGenerator.generate()
            })!
            )
    }

    async updateProduct(input: productInputDTO){
        if(!input.id || !input.name || !input.SKU || !input.price || !input.description || !input.qty || !input.category){
            throw new InvalidInputError("Invalid input to register new product")
        }

        const queryId = await this.productDataBase.VerifyId(input.id);
        if (!queryId[0]) {
        throw new Error("Invalid id");
        }
        await this.productDataBase.changeProduct(Product.toProduct(input)!)
    }
        

    async deleteProduct(params: productDeleteDTO){
        const queryId = await this.productDataBase.VerifyId(params.id);
        if (!queryId[0]) {
        throw new Error("Invalid id");
        }
         
        await this.productDataBase.deleteProduct(params)
    }
    
}