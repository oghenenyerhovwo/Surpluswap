// functions and middleware
import { generateToken }  from "../../../utils/index.js"
import { findUser, updateUserFunc } from "./userFunctions.js"

export const confirmToken = async(req,res) => {
    try {
        const foundUser = await findUser({email: req.user.email})

        
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        } 
        
        const data ={ 
            isVerified: true
        }

        
        req.user.tokenType === "email_verify" ? updateUserFunc(res, foundUser,data):
        req.user.tokenType === "password_reset" ? res.send({resetPasswordEmail: foundUser.email, resetPasswordToken: generateToken({user: foundUser, tokenType: "password_reset_granted"}), user: {} }):
        res.status(404).send({message: "Invalid token"})
        
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to confirm email"})
    }
}

export const tokenSignIn = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const tokenType = req.user.tokenType
        
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        }

        if(tokenType !== "sign_in"){
            return res.status(404).send({message: "Invalid token type"})
        }
        res.status(200).send({user: foundUser})    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}