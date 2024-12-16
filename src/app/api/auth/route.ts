import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'


// handler 
export async function POST(request: NextRequest) {
    try {

        const { type, email, username, password } = await request.json()
        console.log("Data =>", type, email, username, password)
        // corresponding type we are providing function
        if (type === "login") {
            return await login(email, password)
        } else if (type === "register") {
            console.log("keri")
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

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return NextResponse.json({ error: "Invalid user" }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Password incorrect" }, { status: 400 })
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "JWT_SECRET",
            { expiresIn: "1h" }
        )

        const response = NextResponse.json({
            message: "Login successful",
            user: { email: user.email, username: user.username }
        })

        // returning with set token in cookie
        response.headers.append(
            'Set-Cookie',
            serialize('auth_token', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60,
                secure: process.env.NODE_ENV === "production",
                path: "/"
            })
        )

        return response

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to register" }, { status: 500 })
    }
}

// register user
const register = async (username: string, email: string, password: string) => {
    try {
        // Check if user already exists
        console.log("comming")
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("comming here")
        // Create a new user
        const user = await prisma.user.create({
            data: {
                email,
                username, // No need for UserCreateInput, Prisma will infer it
                password: hashedPassword,
            },
        })

        console.log("new user =>", user)
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "JWT_SECRET",
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({
            message: "Registration successful",
            user: { email: user.email, username: user.username }
        })
        // Set the cookie with the JWT token
        response.headers.append(
            'Set-Cookie',
            serialize('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60,
                path: "/"
            })
        )

        return response

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to register" }, { status: 500 })
    }
}
