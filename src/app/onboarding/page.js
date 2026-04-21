'use client'
import { setRole } from '../actions'
import { authClient } from '../../auth-client'
import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
export default function Onboarding() {
    const [user, setUser] = useState('')
    useEffect(() => {
        async function setUserId() {
            const session = await authClient.getSession();
            const userId = session.data.user.id;
            setUser(userId)
        }
        setUserId();
    }, [])
    const handleClick = async (role, userId) => {
        await setRole(role, userId);
        redirect('/dashboard');
    }
    return (
        <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">-First time using Nabit-</h1>
            <div className="flex justify-center text-center colour-gray-800 dark:text-gray-300 text-gray-500 text-lg">
            To get started please select a role
        </div>
        <div className="pt-16 flex mx-auto items-start">
                <img className="g-5 p-3 w-50 h-45 mx-auto mt-8" src="/nabitlogod.png" alt="Nabit Logo" />
            </div>
        <div className="pt-16 flex max-w-4l mx-auto dark:text-white flex-wrap items-start">
                <button onClick={() =>handleClick('requester', user)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Requester</button>
                </div>
                        <button onClick={() =>handleClick('deliverer', user)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Deliverer</button>
                        
                        </>
    );
}
