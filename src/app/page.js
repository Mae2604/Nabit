"use client";
//import { useState, useEffect, useRef } from "react";
import { signIn } from '../auth-client'
import { useRouter } from "next/navigation";
import { setRole } from './actions';
export default function HomePage() {
    const router = useRouter();
    const handleGoogleSignIn = () => {
        router.push("/sign-in");
    };
    const signedIn =() => {
    if (signIn==true && setRole("requester")) {
        router.push("/requester-dashboard");
    } else if (signIn==true && setRole("deliverer")) {
        router.push("/deliverer-dashboard");
    } else {
        router.push("/sign-in");
    }}
    const RoleSwitch=() =>{
        router.push("/role-switcher");
    }

    

    return (
        <div className="min-h-screen gradient-rose-600bg-gray-100">
            <main className="pt-5 px-4">
                <h1 className="text-4xl font-bold text-center mb-6 ">-Welcome to Nabit-</h1>
                <div className="flex text-center colour-gray-800 bg-grey-200 text-gray-500 text-lg mx-200">
                    <p className=" max-w-lg  mt-12">Fast delivery of food on campus from your peers to you!</p>
                </div>
                <div className="pt-16 max-w-4xl mx-auto">
                        <img className="size-75 mt-20 mx-150 absolute -left-40 " src="/nabitlogod.png" alt="Nabit Logo" />
            
                        <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-40 mx-100 shadow-lg mt-8">
                            <div className="space-y-2 text-center text-black-500 italic">
                                <p>New or returning user?</p>
                            </div>
                            <p className= "text-md p-1 text-gray-500">Sign in to proceed</p>
                                <button onClick={handleGoogleSignIn} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Sign in</button>
                        </div>
                
                        <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-45 mx-100 shadow-lg mt-8">
                            <div className="space-y-2 text-center text-black-500 italic">
                                <p>Looking to deliver or request delivery?</p>
                            </div>
                            <p className="text-md p-2 text-gray-500">
                                Click the button below for your dashboard page!</p>
                           
                            <button onClick={signedIn} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">
                                Dashboard
                            </button>
                </div>
                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-45 mx-100 shadow-lg mt-8">
                            <div className="space-y-2 text-center text-black-500 italic">
                                <p>Need to switch role?</p>
                            </div>
                            <p className="text-md p-2 text-gray-500">
                                between deliverers and requesters!</p>
                           
                            <button onClick={RoleSwitch} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">
                                Switch your role
                            </button>
                        </div>
                </div>
            </main>

        </div>
    );
}