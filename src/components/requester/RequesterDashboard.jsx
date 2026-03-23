'use client'
import {useState} from 'react';
import {restaurants, locations, tips, base} from '../../app/campus-data'
import {addRequest} from '../../app/actions'
import {cancelRequest} from '../../app/actions'
import {fetcher} from '../../app/utils'
import useSWR from 'swr'
export default function RequesterDashboard({name,id}){
    const { data, error, isLoading } = useSWR(`/api/users/${id}/requests`, fetcher, {refreshInterval: 3000})

    const[isRequesting,setIsRequesting] = useState(false);

    const[form, setForm] = useState(base)

    const[errorMessage,setErrorMessage] = useState(null)

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

    if (data.length > 0){
        return (
            <div>
                {errorMessage &&
                    <p>{errorMessage}</p>
                }
                <h1>Active order</h1>
                <p>Ordered from: {data[0].restaurant}</p>
                <p>Item(s): {data[0].delivery_contents}</p>
                <p>Deliver to: {data[0].drop_off_spot}</p>
                <p>Room/floor: {data[0].room_floor}</p>
                <p>Confirmation Number: {data[0].confirmation_number}</p>
                <p>Compensation: ${data[0].tip_amount}</p>
                <button onClick={handleCancel}>Cancel</button>
            </div>
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
            <h1>Welcome back, {name}!</h1>
            <button onClick={() => handleClick(true)}>New Request</button>
        </div>
    )
}