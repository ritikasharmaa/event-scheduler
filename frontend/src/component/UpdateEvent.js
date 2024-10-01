// src/components/UpdateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

export const UpdateEvent = () => {
  const [eventId, setEventId] = useState('');
  const [eventData, setEventData] = useState({
    event_name: '',
    start_time: '',
    end_time: '',
    location: ''
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/api/events/${eventId}`, eventData);
      alert('Event updated successfully');
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update event');
    }
  };

  return (
    <div>
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event ID" onChange={(e) => setEventId(e.target.value)} required />
        <input type="text" name="event_name" placeholder="Event Name" onChange={handleChange} />
        <input type="datetime-local" name="start_time" onChange={handleChange} />
        <input type="datetime-local" name="end_time" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

;
