import { NextResponse } from 'next/server'
import db from '@/lib/db' 
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''


    const results = await db('SELECT * FROM products WHERE name ILIKE $1', [`%${query}%`])

    return NextResponse.json(results)
}
