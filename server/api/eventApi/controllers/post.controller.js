import Event from "../../../models/eventModel.js";
import Comment from "../../../models/commentModel.js";
import { isAdmin } from "../../../utils/index.js"

// create Event
export const createEvent = async(req, res) => {
    try {
        const user= req.user

        // only admins create events
        if(!isAdmin(user) && !isSuperAdmin(user)){
            return res.status(404).send({message: "You need to be an admin to do that"})
        }

        const newEvent = await Event.create({...req.body, author: user._id})

        res.send({id: newEvent._id})     
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Event"})
    }
}

// update Event
export const updateEvent = async(req, res) => {
    try {
        const EventId= req.params.id
        const foundEvent=await Event.findById(EventId).populate("author")
        if(foundEvent){
            const user= req.user
            // check if the current user is an admin
            if(!isAdmin(user) && !isSuperAdmin(user)){
                return res.status(404).send({message: "You need to be an admin to do that"})
            }
            const updatedEvent = await Event.findByIdAndUpdate(EventId, req.body)
            return res.send({id: updatedEvent._id})
        } 
        res.status(404).send({message: "Event not found"})
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update Event"})
    }
}

// delete Event
export const deleteEvent = async(req, res) => {
    try {
        const EventId= req.params.id
        const foundEvent=await Event.findById(EventId).populate("author")
        if(foundEvent){
            const user= req.user
            // check if the current user is an admin
            if(!isAdmin(user) && !isSuperAdmin(user)){
                return res.status(404).send({message: "You need to be an admin to do that"})
            }
            foundEvent.comments.forEach(async id => {
                await Comment.findByIdAndDelete(id)
            });
            const deletedEvent = await Event.findByIdAndDelete(EventId)
            res.send({id: deletedEvent._id})  
        } else {
            res.status(404).send({message: "Event not found"})
        }

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete Event"})
    }
}