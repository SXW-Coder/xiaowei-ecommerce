'use client'
import { JwtPayload } from "jsonwebtoken"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/actions/users"
import Address from "./Address"
import { Address as AddressType, CartItem } from '@/types/global'
import font from "@/font.json"
import { useEffect, useState } from "react"
import Image from 'next/image'
import  {Order} from '@/types/global'
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter
} from "./ui/table"

const i = 'content'; 

export default function Account({ authData, addressesData }: { authData: JwtPayload; addressesData: AddressType[] }) {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders")
    console.log('Stored Orders:', storedOrders) 

    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
          setOrders(parsedOrders);
        } else {
          console.error('Parsed orders are not an array or are empty:', parsedOrders);
        }
      } catch (error) {
        console.error('Error parsing orders:', error); 
      }
    } else {
      console.log('No orders found in localStorage'); 
    }
  }, [])


  const handleClick = async () => {
    const res = await logoutAction()
    if (res.status === 200) {
      router.refresh()
    }
  }

  return (
    <div className="container2 py-10">
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">{font[i].account}</h2>
        <div className="flex justify-between items-center">
          <div>
            <p>{font[i].hello}: {authData.name}</p>
            <p>{font[i].sign}: {authData.email}</p>
          </div>
          <Button onClick={handleClick}>{font[i].logout}</Button>
        </div>
      </div>

      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">{font[i].addresses}</h2>
        <div>
          <p>{font[i].addressesdescribe}</p>
        </div>
        < Address authData={authData} addressesData={addressesData } />
      </div>

      <div className="py-4"> 
        <h2 className="text-lg leading-10 font-bold">{font[i].orders}</h2>
        <div>
          {orders.length === 0 ? (
            <p>{font[i].ordersdescribe}</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-base font-bold mb-2">注文 #{index + 1}</h3>
                <table className="w-full table-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">{font[i].item}</TableHead>
                      <TableHead>{font[i].quantity}</TableHead>
                      <TableHead>{font[i].price}</TableHead>
                      <TableHead className="text-right">{font[i].total}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.map((cartItem: CartItem, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Image
                              src={cartItem.product.image}
                              alt={cartItem.product.name}
                              width={64}
                              height={64}
                              priority
                              style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                            />
                            <div className="ml-4 space-y-3">
                              <p className="text-sm font-medium">{cartItem.product.name}</p>
                              <p className="text-xs text-gray-400">{cartItem.selectedVariant}</p>
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
                        ¥{order.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
