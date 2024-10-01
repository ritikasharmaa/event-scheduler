const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;
const db = mongoose.connection

const mongoURI = 'mongodb://localhost:27017/eventDB';
mongoose.connect(mongoURI, {
});

const { createEvent, findAvailableEvents, getUserEvents, updateEvent} = require('./controller/EventController')

app.post('/api/events', createEvent);
app.get('/api/events', getUserEvents)
app.patch('/api/events/:event_id', updateEvent)
app.get('/api/events/available', findAvailableEvents);

app.listen(port, () => {
    console.log("Server listening on port " + port)
})
db.on('error', console.error.bind(console, "MongoDb error: " ))
db.once('open', () => {
    console.log("Connected to MongoDB")
})



