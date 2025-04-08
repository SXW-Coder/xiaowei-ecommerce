'use client'
import { useRouter } from 'next/navigation';
import font from "@/font.json"
const i = 'content'; 

export default function OrderSuccess() {
  const router = useRouter()
  const handleBackToHome = () => {
    router.push('/') 
  }
  return (
    <div className="py-24 text-center">
      <h1 className="text-2xl font-bold">{font[i].ordercomplete}</h1>
          <p className="mt-2">{font[i].thanks}</p>
          <div className="mt-6">
        <button 
          onClick={handleBackToHome} 
          className="px-4 py-2 bg-orange-400 text-white rounded-lg"
        >
          {font[i].backhome}
        </button>
      </div>
    </div>
  )
}
