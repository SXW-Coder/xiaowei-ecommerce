'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Plus,Edit,Trash2 } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addAddressAction ,removeAddressAction,updateAddressAction} from '@/actions/addresses'
import { JwtPayload } from 'jsonwebtoken'
import { Address as AddressType } from '@/types/global'
const formSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    city: z.string().min(1, { message: 'City cannot be empty' }),
    address: z.string().min(1, { message: 'Address cannot be empty' }),
    phone: z.string().min(1, { message: 'Phone cannot be empty' }),
})
import font from "@/font.json"
const i = 'content'; 

export default function Address({ authData, addressesData }: { authData: JwtPayload; addressesData: AddressType[]}) {
    const [open, setOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            city: '',
            address: '',
            phone: '',
        },
    })
    const handleNewAddress = () => {
        form.reset({
            name: "",
            city: "",
            address: "",
            phone: "",
        }); 
        setSelectedAddress(null);
        setOpen(true);
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (selectedAddress) {
            // 編集モード
            await updateAddressAction(selectedAddress.id, values.name, values.city, values.address, values.phone);
        } else {
            // 追加モード
            await addAddressAction(values.name, values.city, values.address, values.phone, authData.userid);
        }
        setOpen(false)
        setSelectedAddress(null);
        form.reset()
    }
    const handleDelete = async (id: number) => {
         await removeAddressAction(id)

    }
    const handleEdit = (address: AddressType) => {
        setSelectedAddress(address);
        form.reset(address);
        setOpen(true);
    };
    return (
        <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600" onClick={handleNewAddress}>
                        <p className="m-3">{ font[i].newaddresses}</p>
                        <div className="absolute bottom-2 left-3">
                            <Plus width={14} />
                        </div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="mb-5">{ font[i].newaddresses}</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-20">{ font[i].nickname}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={ font[i].inputrname}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-20">{ font[i].city}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={ font[i].inputcity}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-20">{ font[i].address}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={ font[i].enteraddress}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="w-20">{ font[i].phone}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={ font[i].inputphone}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{ font[i].cancel}</AlertDialogCancel>
                                    <Button type="submit">{ font[i].save}</Button>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
             {addressesData.map(item => (
                <div key={item.id} className="border rounded-sm h-40 relative text-slate-600">
                    <p className="m-3">{item.name}</p>
                    <div className="text-sm ml-5">
                        <p>{item.city}</p>
                        <p>{item.address}</p>
                        <p>{item.phone}</p>
                    </div>
                    <div className="absolute bottom-2 left-3 flex text-xs gap-2">
                         <div className="flex items-center cursor-pointer" onClick={() => handleEdit(item)}><Edit width={14} /> { font[i].edit}</div>
                        <div className="flex items-center cursor-pointer" onClick={() => handleDelete(item.id)}><Trash2 width={14} />  { font[i].remove}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}