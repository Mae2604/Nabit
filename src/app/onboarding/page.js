'use client'
import {setRole} from '../actions'
import {authClient} from '../../auth-client'
import { useState, useEffect } from 'react';
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

    return(
        <div>
            <h1>Welcome to Nabit!</h1>
            <h1>Please select your role</h1>
            <button onClick={async () => {
                await setRole('requester',user)
            }}>Requester</button>
            <button onClick={async () => {
                await setRole('deliverer',user)
            }}>Deliverer</button>
        </div>
    )
}