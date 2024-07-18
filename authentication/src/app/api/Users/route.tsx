// import User from "@/app/(models)/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// import { NextApiRequest } from 'next';

// export async function POST(req: NextApiRequest) {
//     try {
//         const body = await (req as any).json();
//         const userData = body.formData;

//         // confirm data exists
//         if (!userData?.email || !userData.password) {
//             return NextResponse.json(
//                 {
//                     message: "Email and password are required",
//                 },
//                 {
//                     status: 400,
//                 }
//             );
        
//         }

//         // check for duplicates
//         const duplicate = await User.findOne({ email: userData.email })
//             .lean()
//             .exec();

//         if (duplicate) {
//             return NextResponse.json(
//                 {
//                     message: "Email already exists!",
//                 },
//                 {
//                     status: 409,
//                 }
//             );
        
//         }

//         const hashPassword = await bcrypt.hash(userData.password, 20)
//         userData.password = hashPassword;

//         await User.create(userData)
//         return NextResponse.json(
//             {
//                 message: "User created successfully",
//             },
//             {
//                 status: 201,
//             }
//         );

//     } catch (err) {
//         console.log(err);
//         return NextResponse.json(
//             {
//                 message: "Error", err
//             },
//             {
//                 status: 500
//             }
//         );
//     }
// }


import { NextResponse } from 'next/server';
import { connectToDatabase, User } from '@/app/(models)/User';

// Connect to the database
connectToDatabase();

// Handler for POST requests
import { NextApiRequest } from 'next';

export async function POST(req: NextApiRequest) {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
  }
}

// Handler for GET requests (if needed)
// import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
