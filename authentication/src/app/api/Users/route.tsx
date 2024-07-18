import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;

        // confirm data exists
        if (userData?.email || !userData.password) {
            return NextResponse.json(
                {
                    message: "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        
        }

        // check for duplicates
        const duplicate = await User.findOne({ email: userData.email })
            .lean()
            .exec();

        if (duplicate) {
            return NextResponse.json(
                {
                    message: "Email already exists!",
                },
                {
                    status: 409,
                }
            );
        
        }

        const hashPassword = await bcrypt.hash(userData.password, 20)
        userData.password = hashPassword;

        await User.create(userData)
        return NextResponse.json(
            {
                message: "User created successfully",
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.log(err);
        return NextResponse.json(
            {
                message: "Error",
                err
            },
            {
                status: 500
            }
        );
    }
}