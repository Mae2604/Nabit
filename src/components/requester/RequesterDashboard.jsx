'use client'
import {useState,useEffect} from 'react';
import {restaurants, locations, tips, base} from '../../app/campus-data'
import {addRequest} from '../../app/actions'
import {cancelRequest} from '../../app/actions'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
import {signOut} from '../../auth-client'
import {ProgressBar} from '../requester/ProgressBar'
import { useRouter } from 'next/navigation';

export default function RequesterDashboard({name,id}){

    const[isComplete,setIsComplete] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/users/${id}/requests`, fetcher, {refreshInterval: isComplete ? 0 : 3000})

    const[isRequesting,setIsRequesting] = useState(false);

    const[form, setForm] = useState(base)

    const[errorMessage,setErrorMessage] = useState(null)
    
    const router = useRouter();
    const Homepage=() =>{
            router.push("/");
        }

    const handleGoogleSignOut = () => {
        signOut();
    };


    useEffect(() => {
        if(data != null && data.length > 0 && data[0].status === 'delivered'){
            setIsComplete(true)
        }
    },[data])

    useEffect(() => {
        if(isComplete){
            setTimeout(() => {
                setIsComplete(false)
                mutate(null)
            },4000)
        }
    },[isComplete])

    const handleClick = (value) => {
        setForm(base)
        setIsRequesting(value);
    }

    const handleCancel = async () => {
        const res = await cancelRequest(data[0].id)
        if (res.success){
            setErrorMessage(null)
        } else {
            console.error(res.message)
            setErrorMessage(`${res.message}`)
        }
    }

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addRequest(form,id);
        if (res.success){
            setIsRequesting(false);
            setErrorMessage(null)
        } else {
            console.error(res.message)
            setErrorMessage(`${res.message}`)
        }
    }

    if (error) return <div>Failed to get active requests.</div>

    if(isLoading) return <div>Loading..</div>

    if (data != null && data.length > 0 && data[0].status === 'pending'){
        return (
            <div>
                {errorMessage &&
                    <p>{errorMessage}</p>
                }
        <div>
        <h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Request has been placed!</h1>
                 <div className="flex items-center justify-center p-50">
                    <img className="size-60" src="/nabitlogod.png" alternative="Nabit Logo" />
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 flex flex-row flex-wrap text-center h-full dark:bg-gray-800 w-100 h-45 shadow-lg p-8 gap-2">
                        <div className="text-center text-black dark:text-white">
                        <h1 className="text-3xl font-large dark:text-white text-grey-400 dark:font-semibold font-semibold italic p-8">Your current pickup information</h1>
                        <h1 className="text-lg p-1 text-gray-500 dark:text-gray-400">Active order:</h1>
                        <div className="text-md p-1 text-black dark:text-white">
                        <p><span className="font-semibold italic">Ordered from: </span>{data[0].restaurant}</p>
                        <p><span className="font-semibold italic">Item(s): </span>{data[0].delivery_contents}</p>
                        <p><span className="font-semibold italic">Deliver to: </span>{data[0].drop_off_spot}</p>
                        <p><span className="font-semibold italic">Room/floor: </span>{data[0].room_floor}</p>
                        <p><span className="font-semibold italic">Confirmation Number: </span>{data[0].confirmation_number}</p>
                        <p><span className="font-semibold italic">Compensation: $</span>{data[0].tip_amount}</p>
                        <p><span className="font-semibold italic">Status: </span>{data[0].status}</p>

                    <button onClick={handleCancel} className="w-52 h-10 bg-rose-600 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Cancel</button>
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        )
    }

    if (data != null && data.length > 0 && data[0].status === 'accepted'){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Your order has been accepted!</h1>
            <div className="max-w-4l flex text-centered justify-center flex-wrap mx-auto dark:text-white p-8 gap-8">
            <div className="rounded-lg flex flex-col ring-1 ring-gray-400 text-center bg-gray-100 w-full dark:bg-gray-600 g-5 h-full p-3 shadow-lg mt-50">
            <div className="space-y-2 text-center text-black-500 dark:text-white italic p-5">
                <p>Awaiting another student to accept the order</p>
                <p>The progress can be seen below:</p>
                <ProgressBar value={0} />
        </div>
        </div>
        </div></>
        )
    }

    if (data != null && data.length > 0 && data[0].status === 'picked_up'){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Your order has been picked up!</h1>
            <div className="max-w-4l flex text-centered justify-center flex-wrap mx-auto dark:text-white p-8 gap-8">
            <div className="rounded-lg flex flex-col ring-1 ring-gray-400 text-center bg-gray-100 w-full dark:bg-gray-600 g-5 h-full p-3 shadow-lg mt-50">
            <div className="space-y-2 text-center text-black-500 dark:text-white italic p-5">
                <p>Your order is being picked up currently by another student</p>
                <p>The progress can be seen below:</p>
                <ProgressBar value={50} />
            </div>
            </div>
            </div></>
        )
    }

    if(isComplete){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">-Your order has Arrived!-</h1>
                 <div className="flex items-center justify-center p-50">
                    <img className="size-60" src="/nabitlogod.png" alternative="Nabit Logo" />
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 flex flex-row flex-wrap text-center h-full dark:bg-gray-800 w-100 h-45 shadow-lg p-8 gap-2">
                        <div className="text-center text-black dark:text-white">
                        <h1 className="text-3xl font-large dark:text-white text-grey-400 dark:font-semibold font-semibold italic p-8">Your current pickup information</h1>
                        <h1 className="text-lg p-1 text-gray-500 dark:text-gray-400">Please enjoy your food, and thank you for choosing Nabit!</h1>
            </div>
        </div>
        </div></>
        )
    }

    if(isRequesting){
        return (
            <><h1 className="text-4xl font-bold text-center mb-6 ">
                -Request form-
            </h1>
            <div className="pt-16 flex max-w-4l mx-auto dark:text-white flex-wrap flex-col items-start p-8">
                    <div className="max-w-4l flex text-centered justify-center flex-wrap mx-auto dark:text-white p-8 gap-8">
                        {errorMessage &&
                            <p>{errorMessage}</p>}
                        <form onSubmit={handleSubmit}>

                            <label>
                                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 w-100 mx-auto shadow-lg mt-8 ">
                                    <p className="italic pb-2"> Please select restaurant</p>
                                    
                                    <select required name='restaurant' className= "text-black-500" value={form.restaurant} onChange={handleChange}>
                                        <option value="" disabled>Select a restaurant</option>
                                        {restaurants.map((restaurant) => (
                                            <option key={restaurant} value={restaurant}>{restaurant}</option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                            <label>
                                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 w-100 mx-auto shadow-lg mt-8">
                                    <p className="italic pb-2"> Please select delivery location</p>
                                    <select required name='drop_off_spot' value={form.drop_off_spot} onChange={handleChange}>
                                        <option value="" disabled>Select a delivery location</option>
                                        {locations.map((location) => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 mx-auto shadow-lg mt-8">  
                                <p className="italic pb-2"> Order:</p>
                            <input required name='delivery_contents' value={form.delivery_contents} placeholder='what did you order' onChange={handleChange}></input></div>   
                            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 mx-auto shadow-lg mt-8">
                                <p className="italic pb-2"> Confirmation number on order:</p>
                            <input required name='confirmation_number' value={form.confirmation_number} placeholder='confirmation number' onChange={handleChange}></input></div>
                            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 mx-auto shadow-lg mt-8">
                                <p className="italic pb-2"> Enter room/floor of location:</p>
                            <input required name='room_floor' value={form.room_floor} placeholder='room and/or floor' onChange={handleChange}></input></div>
                            
                            <label>
                                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 mx-auto shadow-lg mt-8">
                                <p className="italic pb-2"> Select the payment from dropbox</p>
                                tip
                                <select required name='tip_amount' value={form.tip_amount} onChange={handleChange}>
                                    <option value="" disabled>Select a tip amount</option>
                                    {tips.map((tip) => (
                                        <option key={tip} value={tip}>${tip}</option>
                                    ))}
                                </select>
                                </div>
                            </label>

                            <button type='submit' className="w-52 h-10 bg-rose-600 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">send request</button>
                            <button onClick={() => handleClick(false)} className="w-52 h-10 bg-rose-600 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">cancel</button>
                    
                        </form>
                        </div>
                </div></>
        )
    }

    
    return(
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">-Welcome back, {name}!-</h1>
            <div className="flex justify-center text-center colour-gray-800 dark:text-gray-300 text-gray-500 text-lg">
            Current role: Requester!
        </div>
        <div className="pt-16 flex mx-auto items-start">
                <img className="g-5 p-3 w-50 h-45 mx-auto mt-8" src="/nabitlogod.png" alt="Nabit Logo" />
            </div>
        <div className="pt-16 flex max-w-4l mx-auto dark:text-white flex-wrap items-start">
                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 w-100 h-45 mx-auto shadow-lg mt-8">
                    <p className="space-y-2 text-center text-black-500 italic">New delivery?
                    </p>
                    <p className="text-md p-1 text-gray-500 dark:text-gray-400">Request new one here!</p>
                <button onClick={() => handleClick(true)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">New Request</button>
                </div>
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 w-100 h-45 mx-auto shadow-lg mt-8">
                        <p className="space-y-2 text-center text-black-500 italic">Sign out?</p>
                        <p className="text-md p-1 text-gray-500 dark:text-gray-400">click button below</p>
                        <button onClick={() => handleGoogleSignOut()} className="w-52 h-10 bg-rose-600 hover:bg-red-700 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Sign out</button>
                        </div>
                         <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-800 w-100 h-45 mx-auto shadow-lg mt-8">
                        <p className="space-y-2 text-center text-black-500 italic">Leave the dashboard?</p>
                        <p className="text-md p-1 text-gray-500 dark:text-gray-400">Takes you to home page!</p>
                        <button onClick={() => Homepage()} className="w-52 h-10 bg-rose-600 hover:bg-red-700 dark:hover:bg-blue-950 dark:bg-blue-900 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Home page</button>
                        </div>
            </div>
            
            </>
    )
}
