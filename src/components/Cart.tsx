'use client'

import { ArrowUpRight, Trash2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { useCartStore } from "@/store"
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation'
import font from "@/font.json"
const i = 'content'; 
export default function Cart({ status }: { status: number }) {
    const { cartList, updateQuantity, removeFromCart } = useCartStore()
    const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1)
    const handleValueChange = (value: string, index: number) => {
        updateQuantity(index, Number(value))
    }
    const handleClick = (index: number) => {
        removeFromCart(index)
    }
    const router = useRouter()

    return (
        <div className="container">
            {cartList.length ? (
                <div className="py-24 px-2 flex">
                    <div className="flex-1 mr-14">
                        <h2 className="text-2xl font-bold mb-6">{font[i].cart}</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[400px]">{font[i].product}</TableHead>
                                    <TableHead>{font[i].quantity}</TableHead>
                                    <TableHead>{font[i].price}</TableHead>
                                    <TableHead className="text-right">{font[i].total}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartList.map((cartItem, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Image src={cartItem.product.image} alt="" width={64} height={64} priority style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                                                <div className="ml-4 space-y-3">
                                                    <p className="text-sm font-medium">{cartItem.product.name}</p>
                                                    <p className="text-xs text-gray-400">{cartItem.selectedVariant}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Trash2 className="mr-1" color="gray" cursor="pointer" onClick={() => handleClick(i)} />
                                                <Select value={cartItem.quantity.toString()} onValueChange={(value: string) => handleValueChange(value, i)}>
                                                    <SelectTrigger className="w-14">
                                                        <SelectValue placeholder="Select Quantity" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {quantityOptions.map((quantity, i) => (
                                                            <SelectItem key={i} value={quantity.toString()}>
                                                                {quantity}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TableCell>
                                        <TableCell>¥{cartItem.product.price}</TableCell>
                                        <TableCell className="text-right">¥{cartItem.product.price * cartItem.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-56">
                        <h2 className="font-sans font-medium flex flex-row text-2xl mb-6">
                            {font[i].total}
                        </h2>
                        <p className="text-2xl font-bold text-red-400 mb-6">¥{cartList.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.quantity, 0).toFixed(2)}</p>
                        {status === 200 ? (
                            <Button className="w-full" onClick={() => router.push('/checkout')}>{font[i].checkout}</Button>
                        ) : (
                            <>
                                <Button className="w-full" onClick={() => router.push('/account')}>{font[i].login}</Button>
                                <p className="text-sm text-slate-500 text-center mt-1">
                                {font[i].verify}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="py-48 px-2">
                    <h2 className="text-2xl font-bold">{font[i].yourcart}</h2>
                    <p className="text-sm w-[400px] mb-6 mt-4">{font[i].cartconfirm}</p>
                    <div className="flex text-sm items-center underline text-orange-400">
                        <Button onClick={() => router.push("/")}>{font[i].shoppingconfirm}</Button>
                        <ArrowUpRight width={18} />
                    </div>
                </div>
            )}
        </div>
    )
}
