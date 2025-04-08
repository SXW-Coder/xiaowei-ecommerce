import { NotAccountType } from "@/types/global";
import { Dispatch, SetStateAction } from "react";
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerAction } from "@/actions/users";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; 
import { useRouter } from "next/navigation";
import font from "@/font.json"
const i = 'content'; 

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    name: z.string().min(2, {message:'Name must be at least 6 characters.'}),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters.' }),
})

export default function Register({ setNotAccountType }: { setNotAccountType: Dispatch<SetStateAction<NotAccountType>> }) {
    const  router  = useRouter()
    // フォームの検証
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
          password: ''
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)
        const res = await registerAction(values.email,values.name,values.password)
        toast(res.body,{
            duration: 2000,
            style: {
                backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
                color: res.status === 200 ? '#155724' : '#721c24'
            }
        })
        if (res.status == 200) { 
            router.refresh()
        }

    }
    return (
        <div className="container2  my-20">
            <h1 className="text-xl mb-3 text-center font-bold">{font[i].member}</h1>
            <p className="text-center mb-6">{font[i].memberdescribe}</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{font[i].email}</FormLabel>
                                <FormControl>
                                    <Input placeholder={font[i].confirmemail} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{font[i].nickname}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={font[i].confirmnickname} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{font[i].password}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={font[i].confirmpassword}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">{font[i].join} </Button>
                </form>
            </Form>
            <p className="text-center text-sm mt-3">{font[i].confirmmember} <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType('login')}>{font[i].sign}</span></p>
        </div>
    )
}