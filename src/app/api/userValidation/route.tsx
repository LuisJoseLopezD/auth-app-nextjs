import { NextResponse } from "next/server";

//mongodb
import {connectMongoDB} from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req:any) {

    try {
        await connectMongoDB();
        const {email} = await req.json();
        
        const user = await User.findOne({email}).select("_id");

        console.log("user: ", user);
        return NextResponse.json({user})

    } catch (error) {
        return NextResponse.json({message: "email is available..."}, { status: 500 })
    }

}