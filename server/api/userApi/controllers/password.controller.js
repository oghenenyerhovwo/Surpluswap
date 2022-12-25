// modules
import bcrypt from "bcryptjs"


// functions and middleware
import { generateToken, sendPasswordResetEmail } from "../../../utils/index.js"
import { findUser, updateUserFunc } from "./userFunctions.js"

export const getPasswordEmail = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.body.email})

        if(!foundUser){
            return res.status(404).send({message: "Email not found"})
        }

        const passwordResetToken = generateToken({user: foundUser, tokenType: "password_reset"})
        const { isMessageSent } = await sendPasswordResetEmail(foundUser.email,  foundUser.firstName, passwordResetToken)
        
        if(!isMessageSent){
            return res.status(404).send({message: "Error: Message was not sent"})
        }
        
        res.send({token: passwordResetToken})
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to send password recovery email"})
    }
   
}


 export const resetPassword =  async(req, res) => {
    const foundUser = await findUser({email: req.user.email})
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        }

         if(req.user.tokenType !== "password_reset_granted"){
            return res.status(404).send({message: "Invalid token type"})
        }

        const data ={
            password: bcrypt.hashSync(req.body.password, 8)
        }
        updateUserFunc(res,foundUser,data)
}
