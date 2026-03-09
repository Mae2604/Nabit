"use client"
import { signOut } from '../auth-client'
export default function Logout(){
    const handleGoogleSignOut = () => {
        signOut();
    };

    return(
        <button onClick={handleGoogleSignOut}>Sign Out</button>
    )
}