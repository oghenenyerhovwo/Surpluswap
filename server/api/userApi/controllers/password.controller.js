// modules
import bcrypt from "bcryptjs"


// functions and middleware
import { generateToken, sendPasswordResetEmail } from "../../../utils/index.js"
import { findUser, updateUserFunc } from "./userFunctions.js"

export const getPasswordEmail = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.body.email})

        if(foundUser){
            const token = generateToken(foundUser)
            sendPasswordResetEmail(foundUser.email, foundUser.fullName, token)
            res.send(token)
        } else {
            return res.status(404).send({message: "Email not recognized"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to confirm email"})
    }
   
}


 export const resetPassword =  async(req, res) => {
    const foundUser = await findUser({email: req.user.email})
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        }
        const data ={
            ...foundUser,
            password: bcrypt.hashSync(req.body.password, 8)
        }
        updateUserFunc(res,foundUser,data)
}
