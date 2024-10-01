// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

export const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    user_id: '',
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
      const response = await axios.post('http://localhost:5000/api/events', eventData);
      alert('Event created successfully');
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input type="text" name="event_name" placeholder="Event Name" onChange={handleChange} required />
        <input type="datetime-local" name="start_time" onChange={handleChange} required />
        <input type="datetime-local" name="end_time" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

