"use client"
import { signIn } from '../auth-client'
export default function Login(){
    const handleGoogleSignIn = () => {
        signIn();
    };

    return (
        <>
                <div className="flex items-center justify-center p-50">
                    <img className="size-60" src="/nabitlogod.png" alternative="Nabit Logo" />
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 flex flex-col text-center flex-row h-full dark:bg-gray-800 w-100 h-100 shadow-lg pb-8">
                        <div className="text-center text-black dark:text-white">
                            <p className="text-3xl font-large dark:text-white text-grey-400 dark:font-semibold font-semibold italic p-8">Sign in to Nabit</p>
                            <p>Fast delivery of food on campus from your peers to you!</p>
                            <p className="text-gray-700 dark:text-gray-300 italic p-10 gap-8 mt-12">Please sign in to continue.</p>
                             <button onClick={handleGoogleSignIn} className="w-52 h-10 bg-rose-600 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto">Sign in with Google</button>
                            </div>
                            </div>
                    </div>

        </>
        
    )
}