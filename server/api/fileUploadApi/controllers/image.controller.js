import cloudinary from '../../../connections/cloudinary.js'
import { isAgent, isAdmin } from "../../../utils/index.js"

export const uploadImage = async (req, res) => {
    try {
        const user= req.user
        // check if the current user is an admin or an agent
        if(!isAgent(user) && !isAdmin(user)){
            return res.status(400).send({message: "You need to be an agent or an admin to make this request"})
        }
        if (!req.file){
            return res.status(400).send({message: "Select image"})
        }
        try {
            const data = await cloudinary.uploader
                .upload(
                    req.file.path, {
                    folder: "EasyRentImages",
                    resource_type: "image",
                    },
                )
            res.send({url: data.secure_url, fileName: req.file.filename})
        } catch (error) {
            console.log(`Cloudinary upload error: ${JSON.stringify(error)}`)
            res.status(404).send({message: `Cloudinary upload error: ${error.message || error.error }`})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not upload image"})
    } 
}