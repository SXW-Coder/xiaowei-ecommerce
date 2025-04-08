'use client'

import { Product } from '@/types/global'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import font from "@/font.json"
const i = 'content'; 
export default function SearchPage() {
    const router = useRouter(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Product[]>([]); 

    const handleClick = (id: number) => { 
        router.push(`/detail/${id}`); 
    };

    useEffect(() => {
        if (!searchTerm) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            const res = await fetch(`/api/search?q=${searchTerm}`);
            const data: Product[] = await res.json();
            setResults(data);
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder={font[i].search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 w-full"
            />
            <ul className="mt-4">
                {results.length > 0 ? (
                    results.map((item) => (
                        <li key={item.id} className="p-2 border-b cursor-pointer" onClick={() => handleClick(item.id)}>
                            {item.name}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">{font[i].Noresults}</li>
                )}
            </ul>
        </div>
    );
}
