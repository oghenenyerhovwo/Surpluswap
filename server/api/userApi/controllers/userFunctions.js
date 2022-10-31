import User from "../../../models/userModel.js"

import { generateToken } from "../../../utils/index.js"

export const findUser = async(object) => {
    try {
        const foundUser = await User.findOne(object)
    
        return foundUser       
    } catch (error) {
        console.log(error)
    } 
} 

export const updateUserFunc = async (res, user, data) => {
    const updatedUser = await User.findByIdAndUpdate(user.id, data)

    res.send({user: updatedUser, token: generateToken(updatedUser),})
 }