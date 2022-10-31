import Event from "../../../models/eventModel.js";

// get Event
export const getEvents = async(req, res) => {
    try {
        const events= await Event.find().sort({date: -1}).populate("author")
        res.send({events}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Event"})
    }
} 

// get Event
export const getEventsWithLimit = async(req, res) => {
    try {
        const events= await Event.find().sort({date: -1}).limit(Number(req.params.limitNumber)).populate("author")
        res.send({events}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Event"})
    }
} 

// get Event
export const getEvent = async(req, res) => {
    try {
        const EventId= req.params.id
        const foundEvent= await Event.findById(EventId)
        if(foundEvent){
            const event = await Event.findById(EventId).populate("author").populate({path: "comments", populate: {path: "author", model: "User"}})
            res.send({event})
        } else {
            res.status(404).send({message: "Event not found"})
        }    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get this Event"})
    }
}