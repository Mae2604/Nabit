"use client"
import { signIn } from '../auth-client'
export default function Login(){
    const handleGoogleSignIn = () => {
        signIn();
    };

    return (
        <>
                <div className="bg-white dark:bg-gray-800 dark:text-white p-8 mt-8">
                    </div>
                    <h1 className="text-3xl font-large dark:text-white text-grey-400 dark:font-semibold font-semibold text-center flex flex-col p-8">Sign in to Nabit</h1>
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-10 p-6 w-100 h-100 mx-230 shadow-lg mt-8">
                        <div className="space-y-4 text-center text-black-500 italic">
                            <p>Welcome to Nabit</p>
                            <p>Fast delivery of food on campus from your peers to you!</p>
                            </div>
                            <img className="size-60 mx-150 absolute -left-0" src="/nabitlogod.png" alternative="Nabit Logo" />
                        <p className="text-gray-700 dark:text-gray-300 text-center flex flex-col max-w-sm gap-2 p-3 mt-12">Please sign in to continue.</p>
                        <button onClick={handleGoogleSignIn} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Sign in with Google</button>
                            </div>

        </>
        
    )
}