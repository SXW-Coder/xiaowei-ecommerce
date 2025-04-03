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
            <h1 className="text-xl mb-3 text-center font-bold">Become a member</h1>
            <p className="text-center mb-6">Create your store member profile.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please enter your email" {...field} />
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Please enter your Name" {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Please enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">Join</Button>
                </form>
            </Form>
            <p className="text-center text-sm mt-3">Aready a member? <span className="underline text-orange-400 cursor-pointer" onClick={() => setNotAccountType('login')}>Sign in.</span></p>
        </div>
    )
}