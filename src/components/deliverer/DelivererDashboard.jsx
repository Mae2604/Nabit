'use client'
import { fetcher } from '../../app/utils'
import useSWR from 'swr'
import { acceptRequest, updateStatus } from '../../app/actions'
import { useState, useEffect } from 'react';
import { signOut } from '../../auth-client'
import DeliveryMap from '../DeliveryMap'
import { restaurant_coords, location_coords, locationToKey } from '../../app/campus-data'

export default function DelivererDashboard({ id }) {
    const [isComplete, setIsComplete] = useState(false)
    const { data: activeOrder, error: activeOrderError, isLoading: activeOrderLoading, mutate } = useSWR(
        `/api/requests/${id}/active`, fetcher, { refreshInterval: 3000 }
    )
    const { data: pendingOrder, error: pendingOrderError, isLoading: pendingOrderLoading } = useSWR(
        activeOrder ? null : '/api/requests/pending', fetcher, { refreshInterval: 3000 }
    )
    const [errorMessage, setErrorMessage] = useState(null)
    const handleGoogleSignOut = () => signOut()
    useEffect(() => {
        if (isComplete) {
            const timer = setTimeout(() => {
                setIsComplete(false)
                mutate(null)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [isComplete, mutate])
    const handleAccept = async (requestId) => {
        const res = await acceptRequest(id, requestId)
        if (res.success) {
            setErrorMessage(null)
        } else {
            setErrorMessage(res.message)
        }
    }

    const handleStatus = async (status, requestId) => {
        const res = await updateStatus(status, requestId)
        if (res.success) {
            setErrorMessage(null)
        } else {
            setErrorMessage(res.message)
        }
        return res
    }

    const getPickupCoords = (restaurantName) => restaurant_coords[restaurantName] || null
    const getDropOffCoords = (dropOffSpot) => {
        const key = locationToKey(dropOffSpot)
        return location_coords[key] || null
    }

    if (activeOrderError) return <div>There was an issue getting your active order.</div>
    if (activeOrderLoading) return <div>Loading..</div>

    if (isComplete) {
        return (
            <>
                <h1 className="text-4xl font-bold text-center mt-10 mb-3">You have fulfilled the order!</h1>
                <div className="rounded-lg ring-1 ring-gray-400 text-center bg-gray-100 dark:bg-gray-600 g-5 p-3 w-200 h-40 mx-140 shadow-lg mt-50">
                    <div className="space-y-2 text-center text-black-500 italic p-5">
                        <p>The order has been delivered. Thank you for choosing Nabit!</p>
                    </div>
                    <p className="text-md p-5">Need to log out?</p>
                    <button
                        onClick={handleGoogleSignOut}
                        className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3"
                    >
                        Sign out
                    </button>
                </div>
            </>
        )
    }

    if (activeOrder && activeOrder.status === 'accepted') {
        const pickupCoords = getPickupCoords(activeOrder.restaurant)
        const dropOffCoords = getDropOffCoords(activeOrder.drop_off_spot)

        return (
            <div>
                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

                <h1 className="text-4xl font-bold text-center mt-10 mb-3">Pick Up Information</h1>
                <div className="rounded-lg ring-1 ring-gray-400 bg-gray-100 dark:bg-gray-600 p-5 w-100 mx-150 shadow-lg mt-50">
                    <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />

                    <div className="space-y-2 text-center text-black-500 italic p-3">
                        <h2 className="font-semibold text-lg">Head to {activeOrder.restaurant} to pick up the order.</h2>
                    </div>

                    <div className="space-y-1 text-center p-3">
                        <p>Items to pick up: <strong>{activeOrder.delivery_contents}</strong></p>
                        <p>Confirmation number: <strong>{activeOrder.confirmation_number}</strong></p>
                        <p>Deliver to: <strong>{activeOrder.drop_off_spot}</strong>{activeOrder.room_floor ? `, ${activeOrder.room_floor}` : ''}</p>
                        <p>Compensation: <strong>${activeOrder.tip_amount}</strong></p>
                    </div>

                    {/* Map: restaurant → drop-off */}
                    {pickupCoords && dropOffCoords ? (
                        <DeliveryMap
                            pickupCoords={pickupCoords}
                            dropOffCoords={dropOffCoords}
                            pickupLabel={activeOrder.restaurant}
                            dropOffLabel={activeOrder.drop_off_spot}
                        />
                    ) : (
                        <p style={{ color: '#888', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                            Map coordinates not available for this route.
                        </p>
                    )}

                    <button
                        onClick={() => handleStatus('picked_up', activeOrder.id)}
                        className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-6"
                    >
                        Mark as picked up
                    </button>
                </div>
            </div>
        )
    }

    if (activeOrder && activeOrder.status === 'picked_up') {
        const pickupCoords = getPickupCoords(activeOrder.restaurant)
        const dropOffCoords = getDropOffCoords(activeOrder.drop_off_spot)

        return (
            <div>
                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

                <h1 className="text-4xl font-bold text-center mt-10 mb-3">Drop Off Location</h1>
                <div className="rounded-lg ring-1 ring-gray-400 bg-gray-100 dark:bg-gray-600 p-5 w-100 mx-150 shadow-lg mt-50">
                    <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />

                    <div className="space-y-2 text-center text-black-500 italic p-3">
                        <h2 className="font-semibold text-lg">Head to <strong>{activeOrder.drop_off_spot}</strong> to drop off the order.</h2>
                        {activeOrder.room_floor && <p>Room / Floor: <strong>{activeOrder.room_floor}</strong></p>}
                        <p>When you arrive, mark the order as delivered.</p>
                    </div>

                    {/* Map: restaurant → drop-off */}
                    {pickupCoords && dropOffCoords ? (
                        <DeliveryMap
                            pickupCoords={pickupCoords}
                            dropOffCoords={dropOffCoords}
                            pickupLabel={activeOrder.restaurant}
                            dropOffLabel={activeOrder.drop_off_spot}
                        />
                    ) : (
                        <p style={{ color: '#888', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                            Map coordinates not available for this route.
                        </p>
                    )}

                    <button
                        onClick={async () => {
                            const res = await handleStatus('delivered', activeOrder.id)
                            if (res.success) setIsComplete(true)
                        }}
                        className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-6"
                    >
                        Mark as delivered
                    </button>
                </div>
            </div>
        )
    }

    if (pendingOrderError) return <div>Failed to get open requests.</div>
    if (pendingOrderLoading) return <div>Loading..</div>
    if (!pendingOrder || pendingOrder.length === 0) return (
        <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">No available requests right now.</p>
            <p className="text-gray-400 text-sm mt-2">Check back shortly.</p>
            <p className="text-md p-5">Need to log out?</p>
            <button
                onClick={handleGoogleSignOut}
                className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3"
            >
                Sign out
            </button>
        </div>
    )

    return (
        <div>
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

            {pendingOrder.map((request) => {
                const pickupCoords = getPickupCoords(request.restaurant)
                const dropOffCoords = getDropOffCoords(request.drop_off_spot)

                return (
                    <div key={request.id}>
                        <h1 className="text-4xl font-bold text-center mt-10 mb-3">New Pickup Requested</h1>
                        <div className="rounded-lg ring-1 ring-gray-400 bg-gray-100 dark:bg-gray-600 p-5 w-100 mx-150 shadow-lg mt-50">
                            <div className="space-y-2 text-center text-black-500 italic p-3">
                                <h2 className="font-semibold">Order details</h2>
                            </div>
                            <img className="size-60 mx-300 absolute -left-10" src="/nabitlogod.png" alt="Nabit Logo" />

                            <div className="space-y-1 text-center p-3">
                                <p>Ordered from: <strong>{request.restaurant}</strong></p>
                                <p>Item(s): <strong>{request.delivery_contents}</strong></p>
                                <p>Deliver to: <strong>{request.drop_off_spot}</strong></p>
                                {request.room_floor && <p>Room/Floor: <strong>{request.room_floor}</strong></p>}
                                <p>Confirmation Number: <strong>{request.confirmation_number}</strong></p>
                                <p>Compensation: <strong>${request.tip_amount}</strong></p>
                            </div>

                            {/* Preview map before accepting */}
                            {pickupCoords && dropOffCoords ? (
                                <DeliveryMap
                                    pickupCoords={pickupCoords}
                                    dropOffCoords={dropOffCoords}
                                    pickupLabel={request.restaurant}
                                    dropOffLabel={request.drop_off_spot}
                                />
                            ) : null}

                            <button
                                onClick={() => handleAccept(request.id)}
                                className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-6"
                            >
                                Accept request
                            </button>

                            <p className="text-md p-5 text-center">Need to log out?</p>
                            <button
                                onClick={handleGoogleSignOut}
                                className="w-52 h-10 bg-rose-600 hover:bg-red-700 text-white rounded-2xl block mx-auto mt-3"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
