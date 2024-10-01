const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({ 
    event_id: { type: String, default: uuidv4, unique: true },
    user_id: { type: String, ref: 'User', required: true },
    event_name: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    location: { type: String },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Canceled'], default: 'Scheduled' }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;