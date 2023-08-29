"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<any>("");
    const [error, setError] = useState<any>(undefined);

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        setError(undefined);
        e.preventDefault();

        try {

            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res) {
                if (res.error) {
                    setError("Invalid credentials");
                    return;
                } else {
                    router.replace("/dashboard");
                }
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                id="email" name="email" type="email" required
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                id="password" name="password" type="password" required
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    <span>Not a member? </span>
                    <Link href={"/register"} className="font-semibold underline leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
                </p>
            </div>

            {error ?
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg" role="alert">
                    <span className="font-bold">Error!</span> {error}.
                </div>
                :
                null
            }

        </div>
    )
}