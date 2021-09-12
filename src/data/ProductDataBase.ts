import { NotFoundError } from "../error/NotFoundError";
import { Product, productDeleteDTO, productOutputDTO } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProdutcDataBase extends BaseDatabase{
  
  private static TABLE_NAME = "Product"
  async VerifyId(id: string | productDeleteDTO) {
    return this.getConnection().select("*").where({ id }).from(ProdutcDataBase.TABLE_NAME);
  }

  public async getProducts(): Promise<productOutputDTO[]>{
    const product = await this.getConnection()
        .select("*")
        .from(ProdutcDataBase.TABLE_NAME)

        if(!product){
          throw new NotFoundError(`Products not found`)
        }

        return product.map( (items: any) =>{
          return{
          id: items.id,
          name: items.name,
          SKU: items.SKU,
          price: items.price,
          description: items.description,
          qty: items.qty,
          category: items.category
          }
        } )
  }

  public async addProduct(product: Product): Promise<void> {
    try {

      await this.getConnection()
      .raw(
          `
          INSERT INTO Product
          VALUES(
          '${product.getId()}',
          '${product.getName()}',
          '${product.getSKU()}',
          '${product.getPrice()}',
          '${product.getDescription()}',
          ${product.getQty()},
          JSON_OBJECT(${product.getCategory()})
          );    
          `
        )
    }
    catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async changeProduct(product: Product): Promise<void> {
    try {
      await this.getConnection()
      .raw(
          `
          UPDATE Product
          SET
          id = '${product.getId()}',
          name = '${product.getName()}',
          SKU = '${product.getSKU()}',
          price = '${product.getPrice()}',
          description = '${product.getDescription()}',
          qty = ${product.getQty()},
          category = JSON_OBJECT(${product.getCategory()})

          where id = '${product.getId()}'
          `
        )
    }

    catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async deleteProduct(id: productDeleteDTO): Promise<void> {
    try {
      await this.getConnection()
      .raw(
          `
          DELETE from ${ProdutcDataBase.TABLE_NAME}
          where id = '${id.id}'
          `
        )
    }

    catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }


}


