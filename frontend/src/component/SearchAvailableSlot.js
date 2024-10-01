import React, { useState } from 'react';
import axios from 'axios';

export const SearchAvailableSlot = () => {
    const [ userId, setUserId] = useState(' ')
    const [timeRange, setTimeRange] = useState({start:'', end:''})
    const [availableSlots, setAvailableSlots] = useState([])
    console.log(availableSlots, "availableSlots")
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`http://localhost:5000/api/events/available?user_id=${userId}&start=${timeRange.start}&end=${timeRange.end}`)
            setAvailableSlots(response.data)
        }
        catch(err){
            alert(err)
        }
    }

    return (
        <>
        <h2>
            SEarch Available Slot
        </h2>
        <form onSubmit={handleSubmit}>
<input type="text"  placeholder='User Id' onChange={(e) => setUserId(e.target.value)}  required />
      <input type="datetime-local" name="start_time" onChange={(e) => setTimeRange({...timeRange, start:e.target.value})}  required/>
      <input type="datetime-local"name="end_time"  onChange={(e) => setTimeRange({...timeRange, end:e.target.value})}  required/>
      <button type="submit">Search</button>
        </form>
        {availableSlots.length > 0 && (
            <div>
                <h3>Avialable slots:</h3>
                <ul>        
            {availableSlots.map((slot,index) => {
       return <li key={index}> {new Date(slot.start_time).toLocaleDateString()} - {new Date(slot.end_time).toLocaleDateString()} </li>})}
                   
                </ul>
            </div>
        )}
        </>
    )

}