import react , {useState} from 'react';
import axios from 'axios';

export const EventList = () => {
   const [ userId, setUserId] = useState(' ')
    const [status, setStatus] = useState('')
    const [events, setEvents] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.get(`http://localhost:5000/api/events?user_id=${userId}&status=${status}`)
            setEvents(response.data)
        }
        catch(err){
            alert(err)
        }
    }


    return (
        <div>
            <h2>
                Event List
            </h2>
            <form onSubmit={handleSubmit}>
<input text ="text" placeholder= "USER ID" onChange={(e) => setUserId(e.target.value)} required />
        <select onChange={(e) => setStatus(e.target.value)} >
            <option value="">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
        </select>
        <button type="submit">GET EVENTS</button>
            </form>
            {events.length > 0 && (
                <div>
                    <h3> USer Events</h3>
                    <ul>
                        {events.map((event) => (
                            <li key={event.event_id}>{event.event_name}</li>
                        ))}
                      
                    </ul>
                    </div>
            )}
        </div>
        
    )
}