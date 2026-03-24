"use client"
import { signIn } from '../auth-client'
export default function Login(){
    const handleGoogleSignIn = () => {
        signIn();
    };

    return (
        <>
        <div>
            <div className="text-3xl font-large text-black font-semibold text-center flex-col gap-2 p-8">Welcome to Nabit!</div>
            <p className="text-black-500 text-center italic">Got your bite, but lazy to walk for the bite? No problem. use Nabit!</p>
            <img className="size-70 shrink-0 mx-auto max-w-sm gap-2 p-8" src="/nabitlogo.png" alt="Nabit Logo" />
            <p className="text-gray-700 text-center mx-auto max-w-sm gap-2 p-3">Please sign in to continue.</p>
        </div>
            <button onClick={handleGoogleSignIn} className="w-52 h-10 bg-red-500 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Sign in with Google</button>
        </>
    )
}