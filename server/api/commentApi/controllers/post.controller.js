import Story from "../../../models/storyModel.js";
import Comment from "../../../models/commentModel.js";
import { isAdmin, isAuthor, isSuperAdmin } from "../../../utils/index.js"

// create comment
export const createComment = async(req, res) => {
    try {
        const {storyId} = req.params
        const user= req.user
        const foundStory = await Story.findById(storyId)

        if(!foundStory)  {
            return res.status(404).send({message: "story not found"})
        }

        const newComment = await Comment.create({...req.body, author: user._id})
        foundStory.comments.push(newComment._id)
        const savedStory =await foundStory.save()

        res.send({id: newComment._id, storyId: savedStory._id})     
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create story"})
    }
}

// delete Comment
export const deleteComment= async(req, res) => {
    try {

        const {storyId} = req.params
        const commentId = req.params.id

        const foundStory= await Story.findById(storyId)
        if(!foundStory)  {
            return res.status(404).send({message: "story not found"})
        }
        
        const foundComment = await Comment.findById(commentId).populate("author")
        if(!foundComment){
            return res.status(404).send({message: "Comment not found"})
        }

        const user= req.user
        const author= foundComment.author
        if(!isAuthor(user, author) && !isAdmin(user) && !isSuperAdmin(user)){
            return res.status(404).send({message: "You need to be the owner or an admin to do that"})
        }

        foundStory.comments== foundStory.comments.filter(id => id != commentId)
        const savedStory =  await foundStory.save()
        const deletedComment = await Comment.findByIdAndRemove(commentId)

        res.send({id: deletedComment._id, storyId: savedStory._id})

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete Story"})
    }
}