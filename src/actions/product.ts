'use server'

import db from "@/lib/db"
import { Product,ProductsAction } from "@/types/global"
export async function productsAction(): ProductsAction{ 
    const result = await db('SELECT * FROM products') as Product[]
    return {
        status: 200,
        body: 'get products success',
        data: result
    }

} 