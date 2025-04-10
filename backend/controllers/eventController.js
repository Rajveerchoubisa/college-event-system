import Event from "../models/EventModel.js";

export const createEvent = async(req,res) => {
    const {title,description,date,venue} = req.body;
    try {
        const event = new Event({title,description,date,venue,createdBy:req.user.id});
        await event.save();
        res.status(201).json({message: "Event created successfully",event});
    } catch (error) {
        res.status(500).json({error: "Event creation failed"})
    }
};

export const getAllEvents = async(req,res) => {
    try {
        const events = await Event.find().sort({date:1});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({error: " failed to fetch events"})
    }
}
