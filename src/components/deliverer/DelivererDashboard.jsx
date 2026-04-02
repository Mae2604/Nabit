'use client'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
import {acceptRequest, updateStatus} from '../../app/actions'
import {useState, useEffect} from 'react';
export default function DelivererDashboard({id}){
    
    const[isComplete,setIsComplete] = useState(false)
    
    const { data: activeOrder, error: activeOrderError, isLoading: activeOrderLoading, mutate} = useSWR(`/api/requests/${id}/active`, fetcher,{refreshInterval: 3000})

    const { data: pendingOrder, error: pendingOrderError, isLoading: pendingOrderLoading} = useSWR(activeOrder ? null : '/api/requests/pending', fetcher,{refreshInterval: 3000})

    const[errorMessage,setErrorMessage] = useState(null)

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
            <h1>You have fulfilled the order!</h1>
        )
    }

    if (activeOrder) {
        if (activeOrder.status === 'accepted'){
            return (
                <div>
                    {errorMessage &&
                        <p>{errorMessage}</p>
                    }
                    <h1>Head to {activeOrder.restaurant}</h1>
                    <h2>You are picking up: {activeOrder.delivery_contents}</h2>
                    <br></br>
                    <h2>The confirmation number is: {activeOrder.confirmation_number}</h2>
                    <button onClick={() => handleStatus('picked_up',activeOrder.id)}>Marked as picked up</button>
                </div>
            )
        }
        if (activeOrder.status === 'picked_up'){
            return (
                <div>
                    {errorMessage &&
                        <p>{errorMessage}</p>
                    }
                    <h1>Head to {activeOrder.drop_off_spot}</h1>
                    <button onClick={async () => {
                        const res = await handleStatus('delivered',activeOrder.id)
                        if (res.success){
                            setIsComplete(true)
                        }
                    }}>Mark as delivered</button>
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
                    <p>Ordered from: {request.restaurant}</p>
                    <p>Item(s): {request.delivery_contents}</p>
                    <p>Deliver to: {request.drop_off_spot}</p>
                    <p>Room/floor: {request.room_floor}</p>
                    <p>Confirmation Number: {request.confirmation_number}</p>
                    <p>Compensation: ${request.tip_amount}</p>
                    <button onClick={() => handleAccept(request.id)}>Accept request</button>
                </div>
            ))}
        </div>
    )
}