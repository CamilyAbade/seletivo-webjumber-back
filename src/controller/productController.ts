import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ProdutcDataBase } from "../data/ProductDataBase";
import { productDeleteDTO, productInputDTO } from "../model/Product";
import { IdGenerator } from "../services/IdGenerator";

export class ProductController{

    async getProducts (req: Request, res: Response): Promise<void>{
        try{
            const productBusiness = new ProductBusiness( 
                new ProdutcDataBase,
                new IdGenerator
                )

            const product =  await productBusiness.getProducts()
            res.status(200).send(product)

        }

        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }
        finally { BaseDatabase.destroyConnection}
    }


    async postProduct (req: Request, res: Response): Promise<void>{
        try{
            const input: productInputDTO = {
                name: req.body.name,
                SKU: req.body.SKU,
                price: req.body.price,
                description: req.body.description,
                qty: req.body.qty,
                category: req.body.category
            }

            const productBusiness = new ProductBusiness( 
                new ProdutcDataBase,
                new IdGenerator
                )

            await productBusiness.postProduct(input)
            res.status(200).send('Post product!')
        }

        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }
        finally { BaseDatabase.destroyConnection}
    }


    async updateProduct (req: Request, res: Response): Promise<void>{

        try{
            const input: productInputDTO = {
                id: req.body.id,
                name: req.body.name,
                SKU: req.body.SKU,
                price: req.body.price,
                description: req.body.description,
                qty: req.body.qty,
                category: req.body.category
            }

            const productBusiness = new ProductBusiness( 
                new ProdutcDataBase,
                new IdGenerator
                )

            await productBusiness.updateProduct(input)
            res.status(200).send('Update product!')

        }
        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }
        finally { BaseDatabase.destroyConnection}
    }

    async deleteProduct (req: Request, res: Response): Promise<void>{

        try{
            const { id } =  req.params;

            const deleteProduct: productDeleteDTO = {
                id
            }

            const productBusiness = new ProductBusiness( 
                new ProdutcDataBase,
                new IdGenerator
                )

            await productBusiness.deleteProduct(deleteProduct)
            res.status(200).send('successfully deleted!')

        }
        catch(error){
            res.status(error.customErrorCode || 400).send({message: error.message})
        }
        finally { BaseDatabase.destroyConnection}
    }

    
}