'use client'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
import {acceptRequest, updateStatus} from '../../app/actions'
import {useState, useEffect} from 'react';
import {signOut} from '../../auth-client'
export default function DelivererDashboard({id}){
    
    const[isComplete,setIsComplete] = useState(false)
    
    const { data: activeOrder, error: activeOrderError, isLoading: activeOrderLoading, mutate} = useSWR(`/api/requests/${id}/active`, fetcher,{refreshInterval: 3000})

    const { data: pendingOrder, error: pendingOrderError, isLoading: pendingOrderLoading} = useSWR(activeOrder ? null : '/api/requests/pending', fetcher,{refreshInterval: 3000})

    const[errorMessage,setErrorMessage] = useState(null)
    const handleGoogleSignOut = () => {
        signOut();
    };

    useEffect(() => {
        if(isComplete){
            setTimeout(() => {
                setIsComplete(false)
                mutate(null)
            },4000)
        }
    },[isComplete])

    const handleAccept = async (requestId) => {
        const res = await acceptRequest(id,requestId)
        if(res.success){
            setErrorMessage(null)
        } else {
            setErrorMessage(res.message)
        }
    }

    const handleStatus = async (status,requestId) => {
        const res = await updateStatus(status,requestId)

        if(res.success){
            setErrorMessage(null)
        } else {
            setErrorMessage(res.message)
        }

        return res
    }
    
    if (activeOrderError) return <div>There was an issue getting your active order.</div>

    if (activeOrderLoading) return <div>Loading..</div>

    if(isComplete){
        return(
            <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">You have fulfilled the order!</h1>
            <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
                <div className="space-y-2 text-center text-black-500 italic p-5">
                    <p>The order has been delivered, Thank you for choosing Nabit!</p>
                </div>
                <p className="text-md p-5">Need to log out?</p>
                    <button onClick={() => handleGoogleSignOut()} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3">Sign out</button>
            </div></>
        )
    }

    if (activeOrder) {
        if (activeOrder.status === 'accepted'){
            return (
                <div>
                    {errorMessage &&
                        <p>{errorMessage}</p>
                    }
                    <h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Pick Up Information</h1>
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-80 mx-150 shadow-lg mt-50">
                        <div className="space-y-2 text-center text-black-500 italic p-5">
                            <h1>You have marked the order as picked up!</h1>
                            </div>
                            <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />
                            <p>1. Head to {activeOrder.restaurant}</p>
                            <div className="space-y-2 text-center text-black-500 p-5">
                                <p>You are picking up: {activeOrder.delivery_contents}</p>
                                <p>The confirmation number is: {activeOrder.confirmation_number}</p>
                            </div>
                            <button onClick={() => handleStatus('picked_up',activeOrder.id)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Marked as picked up</button>
                        </div>
                    <h1>Head to {activeOrder.restaurant}</h1>
                </div>
            )
        }
        if (activeOrder.status === 'picked_up'){
            return (
                <div>
                    {errorMessage &&
                        <p>{errorMessage}</p>
                    }
                    <h1 className="text-4xl font-bold text-center mt-10 mb-3 ">Drop off location</h1>
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-60 mx-150 shadow-lg mt-50">
                    <div className="space-y-2 text-center text-black-500 italic p-5">
                        <h1>When you arrive, please mark the order as delivered for the requester!</h1>
                        </div>
                        <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />
                        <h1>Head to {activeOrder.drop_off_spot}</h1>
                        <button onClick={async () => {
                            const res = await handleStatus('delivered',activeOrder.id)
                            if (res.success){
                                setIsComplete(true)
                            }
                        }}className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Mark as delivered</button>
                    </div>
                </div>
            )
        }
    }
    
    if (pendingOrderError) return <div>Failed to get open requests.</div>
    
    if (pendingOrderLoading) return <div>Loading..</div>

    if (pendingOrder.length === 0) return <div>No available requests.</div>
    
    return(
        <div>
            {errorMessage &&
                <p>{errorMessage}</p>
            }
            {pendingOrder.map((request) => (
                <div key={request.id}>
                    <><h1 className="text-4xl font-bold text-center mt-10 mb-3 ">New Pickup Requested</h1>
                    <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-100 h-120 mx-150 shadow-lg mt-50">
                        <div className="space-y-2 text-center text-black-500 italic p-5">
                            <h1>Pickup information from Requester</h1>
                            <h1>Order details:</h1>
                        </div>
                        <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />
                        <p>Ordered from: {request.restaurant}</p>
                        <p>Item(s): {request.delivery_contents}</p>
                        <p>Deliver to: {request.drop_off_spot}</p>
                        <p>Room/floor: {request.room_floor}</p>
                        <p>Confirmation Number: {request.confirmation_number}</p>
                        <p>Compensation: ${request.tip_amount}</p>
                        <button onClick={() => handleAccept(request.id)} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-10">Accept request</button>
                        <p className="text-md p-5">Need to log out?</p>
                        <button onClick={() => handleGoogleSignOut()} className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3">Sign out</button>
                    </div>
                    </>

                </div>
            ))}
        </div>  
    )
}