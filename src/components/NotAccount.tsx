'use client'
import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import { NotAccountType } from "@/types/global"
export default function NotAccount() { 
    const [NotAccountType,setNotAccountType] = useState<NotAccountType>('login')
    return (
        <>
            { NotAccountType === 'login' ? <Login setNotAccountType={setNotAccountType} />:<Register setNotAccountType={setNotAccountType} />}
       </>
    )
}