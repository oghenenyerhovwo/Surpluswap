import Image from "../../../models/imageModel.js";
import { isAgent, isAdmin } from "../../../utils/index.js"

// create Image
export const postImage = async(req, res) => {
    try {
        const user= req.user
        // check if the current user is an admin or an agent
        if(!isAgent(user) && !isAdmin(user)){
            return res.status(404).send({message: "You need to be an agent or an admin to make this request"})
        }
        const newImage = await Image.create(req.body)
        res.send({image: newImage})
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Image"})
    }
}
