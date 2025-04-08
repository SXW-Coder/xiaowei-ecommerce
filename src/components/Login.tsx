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
import { loginAction } from "@/actions/users";
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import font from "@/font.json"
const i = 'content'; 

const formSchema = z.object({
    email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
    password: z
        .string()
        .min(6, { message: 'パスワードは6文字以上でなければなりません。' }),
})

export default function Login({ setNotAccountType }: { setNotAccountType: Dispatch<SetStateAction<NotAccountType>> }) {
    // フォームの検証
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await loginAction(values.email, values.password)
        toast(res.body,{
            duration: 2000,
            style: {
                backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
                color: res.status === 200 ? '#155724' : '#721c24'
            }
        })

    }
    return (
        <div className="container2  my-20">
            <h1 className="text-xl mb-3 text-center font-bold">{font[i].title}</h1>
            <p className="text-center mb-6">{font[i].describe}</p>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{font[i].password}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={font[i].confirmpassword} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">{font[i].sign}</Button>
                </form>
            </Form>
            <p className="text-center text-sm mt-3">{font[i].notmember} <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType('register')}>{font[i].join}</span></p>
        </div>
    )
}