'use client'
import { Address } from '@/types/global'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table'
import { Button } from './ui/button'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { useState } from 'react'
import font from "@/font.json"
const i = 'content'; 
import { useRouter } from 'next/navigation';


export default function Checkout({
  addressesData,
}: {
  addressesData: Address[]
}) {
  const { cartList } = useCartStore()
  const { clearCart  } = useCartStore()
  const [selectAddress, setSelectAddress] = useState('')
  const router = useRouter();
  const handleCreateOrder = async () => {
    const prevOrders = JSON.parse(localStorage.getItem("orders") || "[]")
  const newOrder = [...cartList]
  localStorage.setItem("orders", JSON.stringify([...prevOrders, newOrder]))

  clearCart()
  router.push('/success')
  };
  return (
    <>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">{font[i].addresses}</h2>
        {addressesData.length === 0 ? (
          <div className="my-2">
            <p>{font[i].enteraddress}</p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/account">{font[i].newaddresses}</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Select onValueChange={setSelectAddress}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={font[i].selectaddress} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{font[i].addresses}</SelectLabel>
                  {addressesData.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      <h3 className="font-bold m-2">{item.name}</h3>
                      <p className="mx-5">{font[i].city}:{item.city}</p>
                      <p className="mx-5">{font[i].address}:{item.address}</p>
                      <p className="mx-5">{font[i].phone}: {item.phone}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">{font[i].cart}</h2>
        {cartList.length === 0 ? (
          <div className="my-2">
            <p>
              {font[i].nocart}
            </p>
            <div className="flex text-sm items-center underline text-orange-400">
              <Link href="/">{font[i].shopping}</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">{font[i].item}</TableHead>
                  <TableHead>{font[i].quantity}</TableHead>
                  <TableHead>{font[i].price}</TableHead>
                  <TableHead className="text-right">{font[i].total}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((cartItem, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Image
                          src={cartItem.product.image}
                          alt={cartItem.product.name}
                          width={64}
                          height={64}
                          priority
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">
                            {cartItem.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {cartItem.selectedVariant}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{cartItem.quantity}</TableCell>
                    <TableCell>¥{cartItem.product.price}</TableCell>
                    <TableCell className="text-right">
                      ¥{cartItem.product.price * cartItem.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>{font[i].total}</TableCell>
                  <TableCell className="text-right">
                    ¥
                    {cartList
                      .reduce(
                        (acc, cartItem) =>
                          acc + cartItem.product.price * cartItem.quantity,
                        0
                      )
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}

      </div>
      <div className="mt-4">
        <Button onClick={handleCreateOrder} disabled={!selectAddress || !cartList.length}>{font[i].createorder}</Button>
      </div>
    </>
  )
}
