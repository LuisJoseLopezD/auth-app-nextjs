"use client";

import { signOut } from "next-auth/react";
import {useSession} from "next-auth/react";

export default function Userinfo() {

    const {data:session} = useSession();

    console.log(session);

    return (
        <div className="flex flex-col p-4">
            <p>Name:  {session?.user?.name} </p>
            <p>Email: {session?.user?.email}</p>
            <button
                onClick={() => signOut()}
                className="bg-red-600 w-32 text-white">
                Log out
            </button>
        </div>
    )
}