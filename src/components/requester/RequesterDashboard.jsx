'use client'
import {useState,useEffect} from 'react';
import {restaurants, locations, tips, base} from '../../app/campus-data'
import {addRequest} from '../../app/actions'
import {cancelRequest} from '../../app/actions'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
import {signOut} from '../../auth-client'
import {ProgressBar} from '../requester/ProgressBar'

export default function RequesterDashboard({name,id}){

    const[isComplete,setIsComplete] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/users/${id}/requests`, fetcher, {refreshInterval: isComplete ? 0 : 3000})

    const[isRequesting,setIsRequesting] = useState(false);

    const[form, setForm] = useState(base)

    const[errorMessage,setErrorMessage] = useState(null)

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
        <h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Request New Pickup</h1>
        <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-100 mx-250 shadow-lg mt-50">
                <div className="space-y-2 text-center text-black-500 italic p-5">
                    <h1>Your current pickup information</h1>
                    <h1>Active order:</h1>
                    </div>
                    <img className="size-60 mx-150 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />
                    <p>Ordered from: {data[0].restaurant}</p>
                    <p>Item(s): {data[0].delivery_contents}</p>
                    <p>Deliver to: {data[0].drop_off_spot}</p>
                    <p>Room/floor: {data[0].room_floor}</p>
                    <p>Confirmation Number: {data[0].confirmation_number}</p>
                    <p>Compensation: ${data[0].tip_amount}</p>
                    <p>Status: {data[0].status}</p>
                    <button onClick={handleCancel} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Cancel</button>
                
            </div>
        </div>
        </div>
        )
    }

    if (data != null && data.length > 0 && data[0].status === 'accepted'){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Your order has been accepted!</h1>
            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
            <div className="space-y-2 text-center text-black-500 italic p-5">
                <p>Awaiting another student to accept the order</p>
            </div>
            <p>The progress can be seen below:</p>
            <ProgressBar value={0} />
        </div></>
        )
    }

    if (data != null && data.length > 0 && data[0].status === 'picked_up'){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Your order has been picked up!</h1>
            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
            <div className="space-y-2 text-center text-black-500 italic p-5">
                <p>Your order is being picked up currently by another student</p>
            </div>
            <p>The progress can be seen below:</p>
            <ProgressBar value={50} />
            </div></>
        )
    }

    if(isComplete){
        return (
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Your order has been Delivered!</h1>
        <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
            <div className="space-y-2 text-center text-black-500 italic p-5">
                <p>Please enjoy your food, and thank you for choosing Nabit!</p>
            </div>
        </div></>
        )
    }

    if(isRequesting){
        return (
            <div>
                {errorMessage &&
                    <p>{errorMessage}</p>
                }
                <form onSubmit={handleSubmit}>
                    <label>
                        restaurant
                        <select required name='restaurant' value={form.restaurant} onChange={handleChange}>
                            <option value="" disabled>Select a restaurant</option>
                            {restaurants.map((restaurant) => (
                                <option key={restaurant} value={restaurant}>{restaurant}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        delivery location
                        <select required name='drop_off_spot' value={form.drop_off_spot} onChange={handleChange}>
                            <option value="" disabled>Select a delivery location</option>
                            {locations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </label>
                    
                    <input required name='delivery_contents' value={form.delivery_contents} placeholder='what did you order' onChange={handleChange}></input>

                    <input required name='confirmation_number' value={form.confirmation_number} placeholder='confirmation number' onChange={handleChange}></input>
                    
                    <input required name='room_floor' value={form.room_floor} placeholder='room and/or floor' onChange={handleChange}></input>

                    <label>
                        tip
                        <select required name='tip_amount' value={form.tip_amount} onChange={handleChange}>
                            <option value="" disabled>Select a tip amount</option>
                            {tips.map((tip) => (
                                <option key={tip} value={tip}>${tip}</option>
                            ))}
                        </select>
                    </label>

                    <button type='submit'>send request</button>

                </form>
                <button onClick={() => handleClick(false)}>exit</button>
            </div>
        )
    }

    
    return(
        <div>
            <h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Welcome back, {name}!</h1>
            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h100 mx-250 shadow-lg mt-50">
                <img className="size-60 mx-150 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />
                <div className="space-y-2 text-center text-black-500 italic p-5">
                <p className="text-md p-2">New order needs to be delivered?</p></div>
                <button onClick={() => handleClick(true)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">New Request</button>
                 <p className="text-md p-5">Need to log out?</p>
                    <button onClick={() => handleGoogleSignOut()} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3">Sign out</button></div>
        </div>
    )
}