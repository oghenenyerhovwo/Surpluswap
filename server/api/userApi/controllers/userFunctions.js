import User from "../../../models/userModel.js"

export const findUser = async(object) => {
    try {
        const foundUser = await User.findOne(object)
    
        return foundUser       
    } catch (error) {
        console.log(error)
    } 
} 

export const updateUserFunc = async (res, user, data) => {
    const updatedUser = await User.findByIdAndUpdate(user._id, data)

    res.send({user: updatedUser})
 }