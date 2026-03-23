'use client'
import {setRole} from '../actions'
import {authClient} from '../../auth-client'
import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
export default function Onboarding(){
    const[user,setUser] = useState('')

    useEffect(() => {
        async function setUserId(){
            const session = await authClient.getSession();
            const userId = session.data.user.id;
            setUser(userId)
        }

        setUserId();
    },[])

    const handleClick = async (role,userId) => {
        await setRole(role,userId);
        redirect('/dashboard');
    }

    return(
        <div>
            <h1>Welcome to Nabit!</h1>
            <h1>Please select your role</h1>
            <button onClick={() => handleClick('requester',user)}>Requester</button>
            <button onClick={() => handleClick('deliverer',user)}>Deliverer</button>
        </div>
    )
}