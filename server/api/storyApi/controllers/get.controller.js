import Story from "../../../models/storyModel.js";

// get Story
export const getStories = async(req, res) => {
    try {
        const stories= await Story.find().sort({date: -1}).populate("author").populate("views")
        res.send({stories}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Story"})
    }
} 

// get Story
export const getStoriesWithLimit = async(req, res) => {
    try {
        const stories= await Story.find().sort({date: -1}).limit(Number(req.params.limitNumber)).populate("author").populate("views")
        res.send({stories}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Story"})
    }
} 

// get Story for user
export const getStoriesMine = async(req, res) => {
    try {
        const stories= await Story.find({author: req.params.id}).populate("author").populate("views")
        res.send({stories}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Story"})
    }
}

// get Story
export const getStory = async(req, res) => {
    try {
        const storyId= req.params.id
        const foundStory= await Story.findById(storyId)
        if(foundStory){
            const story = await Story.findById(storyId).populate("author").populate({path: "comments", populate: {path: "author", model: "User"}})
            res.send({story})
        } else {
            res.status(404).send({message: "Story not found"})
        }    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get this Story"})
    }
}

