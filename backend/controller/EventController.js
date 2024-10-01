const Event = require('../models/Event')
const createEvent = async(req, res) => {
    const {user_id, event_name, start_time,end_time,location} = req.body;
    const conflict = await Event.findOne({user_id, sort:[
        {start_time: {$lt: end_time}, end_time: {$gt: start_time}},
        {start_time: {$lt: end_time}, end_time: {$gt: start_time}}
]});
if (conflict){
    return res.status(409).json({message:"Event conflicts with an existing event"})
}
const event = new Event({user_id, event_name,start_time,end_time,location})
await event.save();
res.status(201).json(event);
}

const findAvailableEvents = async (req, res) => {
    const {user_id, start,end,} = req.query;
    const event  = await Event.find({user_id, start_time:{$gte: start}, end_time:{$lte: end},
    status: 'Scheduled'}).sort({start_time: 1}) 
    let availableSlots = [];
    let prevEnd = new Date(start)
    event.forEach(event => {
        if(prevEnd < event.start_time){
            availableSlots.push({start_time:prevEnd, end_time:event.start_time})
        }
        prevEnd = event.end_time;
   })
   if(prevEnd < new Date(end))
   availableSlots.push({start_time:prevEnd, end_time: new Date(end)})
   res.json(availableSlots)
}

const getUserEvents = async (req,res) => {
    const { user_id, status, time_range} = req.query
    const [start_time, end_time] = time_range ? time_range.split(','): [null, null]
    const filter = {user_id};
    if(status) filter.status = status;
    if(start_time && end_time) {
        filter.start_time = {$gte: new Date(start_time)};
        filter.end_time = {$lte: new Date(end_time)};
    }
    const events= await Event.find(filter)
    res.json(events)
}

const updateEvent = async (req, res) => {
    const {event_id} = req.params;
    const { event_name, start_time, end_time, location} = req.body
    const event = await Event.findById(event_id);
    if(!event) return res.status(404).json({message: 'Event not found'});
    const conflict = await Event.findOne({
        user_id: event.user_id,
        _id: {$ne: event_id},
        $or:[
            {start_time: {$gt: end_time}, end_time: {$lt: start_time}},
            {start_time: {$gt: end_time}, end_time: {$lt: start_time}}
        ]
    })
    if(conflict){
        return res.status(409).json({message:"Event conflicts with existing events"})
    
    }
    event.event_name = event_name || event.event_name;
    event.start_time = start_time || event.start_time;
    event.end_time = end_time || event.end_time;
    event.location = location || event.location;

    await event.save()
    res.json(event)
}
module.exports =  {
    createEvent,
    findAvailableEvents,
    getUserEvents,
    updateEvent
}