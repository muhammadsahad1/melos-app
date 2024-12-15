import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// handler 
export async function POST(request: NextRequest) {
    try {

        const { type, email, username, password } = await request.json()

        if (type === "login") {
            return await login(email, password)
        } else if (type === "resgister") {
            return await register(username, email, password)
        } else {
            return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// login user
const login = async (email: string, password: string) => {
    try {

    } catch (error) {

    }
}

// regiser user 
const register = async (username: string, email: string, password: string) => {
    try {

    } catch (error) {

    }
}