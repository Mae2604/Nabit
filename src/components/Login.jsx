"use client"
import { signIn } from '../auth-client'
export default function Login(){
    const handleGoogleSignIn = () => {
        signIn();
    };

    return(
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    )
}