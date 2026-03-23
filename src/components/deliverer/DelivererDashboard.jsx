'use client'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
export default function DelivererDashboard(){
    const { data, error, isLoading } = useSWR('/api/requests/available', fetcher,{refreshInterval: 3000})

    if (error) return <div>Failed to get active requests.</div>
    
    if (isLoading) return <div>Loading..</div>

    if (data.length == 0) return <div>No available requests.</div>
    
    return(
        <div>
            {data.map((request) => (
                <div key={request.id}>
                    <p>Ordered from: {request.restaurant}</p>
                    <p>Item(s): {request.delivery_contents}</p>
                    <p>Deliver to: {request.drop_off_spot}</p>
                    <p>Room/floor: {request.room_floor}</p>
                    <p>Confirmation Number: {request.confirmation_number}</p>
                    <p>Compensation: ${request.tip_amount}</p>
                    <button>Accept request</button>
                </div>
            ))}
        </div>
    )
}