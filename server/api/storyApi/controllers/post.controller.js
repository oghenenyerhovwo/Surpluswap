import Story from "../../../models/storyModel.js";
import Comment from "../../../models/commentModel.js";
import { isAdmin, isAuthor, isSuperAdmin } from "../../../utils/index.js"

// create story
export const createStory = async(req, res) => {
    try {
        const user= req.user
        const newStory = await Story.create({...req.body, author: user._id})

        res.send({id: newStory._id})     
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create story"})
    }
}

// update Story
export const updateStory = async(req, res) => {
    try {
        const storyId= req.params.id
        const foundStory=await Story.findById(storyId).populate("author")
        if(foundStory){
            const author= foundStory.author
            const user= req.user
            // check if the current user owns the Story
            if(!isAuthor(user, author)){
                return res.status(404).send({message: "You need to be the owner or an admin to do that"})
            }
            const updatedStory = await Story.findByIdAndUpdate(storyId, req.body)
            return res.send({id: updatedStory._id})
        } 
        res.status(404).send({message: "Story not found"})
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update Story"})
    }
}

// delete Story
export const deleteStory = async(req, res) => {
    try {
        const storyId= req.params.id
        const foundStory=await Story.findById(storyId).populate("author")
        if(foundStory){
            const user= req.user
            const author= foundStory.author
            // check if the current user owns the Story or is an admin
            if(!isAuthor(user, author) && !isAdmin(user) && !isSuperAdmin(user)){
                return res.status(404).send({message: "You need to be the owner or an admin to do that"})
            }
            foundStory.comments.forEach(async id => {
                await Comment.findByIdAndDelete(id)
            });
            const deletedStory = await Story.findByIdAndDelete(storyId)
            res.send({id: deletedStory._id})  
        } else {
            res.status(404).send({message: "Story not found"})
        }

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete Story"})
    }
}

// Add view to story
export const addView = async(req, res) => {
    try {
        const storyId= req.params.id
        const foundStory=await Story.findById(storyId).populate("author")
        if(foundStory){
            const author= foundStory.author
            const user= req.user
            // check if the current user owns the Story
            if(isAuthor(user, author) || foundStory.views.includes(user._id) ){
                return res.status(404).send({message: "You need to be the owner or an admin to do that"})
            }
            foundStory.views.push(user._id)
            const savedStory = await foundStory.save()

            return res.send({id: savedStory._id})
        } 
        res.status(404).send({message: "Story not found"})
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update Story"})
    }
}