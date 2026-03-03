"use client"
import { signIn } from '../../../auth-client'
export default function SignInComponent(){
    const handleGoogleSignIn = () => {
        signIn();
    };

    return(
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    )
}