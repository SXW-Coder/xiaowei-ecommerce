'use server'

import db from "@/lib/db"
import { Product,ProductsAction,ProductAction } from "@/types/global"
// export async function productsAction(): Promise<ProductsAction>{
//     const result = await db('SELECT * FROM products') as Product[]
//     return {
//         status: 200,
//         body: 'get products success',
//         data: result
//     }

// } 
export async function productsAction(language: string = 'ja'): Promise<ProductsAction> { 
    const result = await db(`
        SELECT p.*, 
            COALESCE(t.translated_value, p.name) AS name 
        FROM products p
        LEFT JOIN translations t 
            ON p.id = t.record_id 
            AND t.table_name = 'products' 
            AND t.field_name = 'name' 
            AND t.language_code = $1
    `, [language]) as Product[]

    return {
        status: 200,
        body: 'get products success',
        data: result
    }
}

export async function productAction(id: number):Promise<ProductAction> {
    const result = (await db('SELECT * FROM products WHERE id = $1', [id])) as Product[]
    return {
        status: 200,
        body: 'get products success',
        data: result[0]
    }
}