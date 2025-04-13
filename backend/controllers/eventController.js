import Event from "../models/EventModel.js";

export const createEvent = async(req,res) => {
    const {title,description,date,venue} = req.body;
    try {
        const event = new Event({title,description,date: new Date(date),venue,createdBy:req.user.id});
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

export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { date, venue } = req.body;

    // Ensure the date is passed as a Date object
    const updated = await Event.findByIdAndUpdate(
      eventId,
      { date: new Date(date), venue },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};
