'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Product } from "@/types/global"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useCartStore from "@/store/cartStore"

export default function AddCart({ product }: { product: Product }) {  
    const [value, setValue] = useState<string>('')
    const { cartList, addToCart, isItemInCart, updateQuantity } = useCartStore()
    const hanleValueChange = (value:string) => { 
        setValue(value)
    }

    const handleClick = () => { 
        const index = isItemInCart(product.name, value)
        if (index < 0) {
            addToCart({
                product,
                quantity: 1,
                selectedVariant: value
            })
        }
        else { 
            updateQuantity(index,cartList[index].quantity+1)
        }
        setValue('')
    }
    return (
        <div className="w-80 py-12">
            <h3>選択する</h3>
            <ToggleGroup value={value} className="justify-start py-6 border-b mb-6" variant="outline" type="single"
                onValueChange={hanleValueChange}>
                {product.variant.map((item,i) => <ToggleGroupItem className="px-4 bg-slate-50 mr-3"  key={i} value={item}>{item}
                </ToggleGroupItem>)}
            </ToggleGroup>
            <h3>価格</h3>
            <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p> 
            <Button disabled={ value?false:true} onClick={handleClick}>カートに追加する</Button>
        </div>
    )
}