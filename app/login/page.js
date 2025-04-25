"use client"

import Image from 'next/image'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function Login() {

    const handleLogin = async (e) => {
        e.preventDefault();
        const identifier = e.target.identifier.value;
        const password = e.target.password.value;
        const data = { identifier, password };
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, data)
            console.log(result)
            Cookies.set('token', result?.data?.data, { expires:1});
            toast.success('Login successful!')
            e.target.reset();
        } catch (error) {
            toast.error(error.response.data.message || 'Login failed!')
            console.log('Login error:', error);
        }
    }

    return (
        <>
            <Toaster />
            <div className="h-screen flex items-center justify-center bg-[url('/abstractbg.svg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="min-h-[60%] flex w-full max-w-5xl bg-white/30 backdrop-blur-md shadow-lg rounded-lg overflow-hidden mx-4 z-10" >
                    <div className="relative hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
                        <Image
                            src="/image/inv_reduced.jpg"
                            alt="Inventory Illustration"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-10 flex flex-col justify-center gap-4">
                        <h2 className="text-3xl font-semibold mb-4">Login</h2>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                                    Email or Username
                                </label>
                                <input
                                    type="text"
                                    id="identifier"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com or abc32"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
