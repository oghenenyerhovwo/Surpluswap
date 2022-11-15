// modules
import bcrypt from "bcryptjs"

import User from "../../../models/userModel.js"


// functions and middleware
import { generateToken, sendConfirmationEmail }  from "../../../utils/index.js"
import { findUser, updateUserFunc } from "./userFunctions.js"

export const signUp = async(req, res) => {
    try {
        const {email, phoneNumberText} = req.body
        
        // check if email already exists
        const foundUserByEmail = await findUser({email: email}) 
        if(foundUserByEmail){
            return res.status(401).send({message: "This email has been used previously"})
        }

        // check if phone number already exists
        const foundUserByPhoneNumberText = await findUser({phoneNumberText: phoneNumberText}) 
        if(foundUserByPhoneNumberText){
            return res.status(401).send({message: "This phone number has been used previously"})
        }

        const newUser= {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        }
        const createdUser = await User.create(newUser)
        const token = generateToken(createdUser)
        res.send({user: createdUser, token})
        createdUser.email && sendConfirmationEmail(createdUser.email, createdUser.fullName, token)

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to sign up user"})
    }
   
}

export const signIn = async(req, res) => {
    const {emailOrPhoneNumber, password} = req.body
    
    const foundUserByEmail = await findUser({email: emailOrPhoneNumber}) 
    const foundUserByPhoneNumberText = await findUser({phoneNumberText: emailOrPhoneNumber}) 
    const foundUserByPhoneNumberTextWithCode = await findUser({phoneNumberTextWithCode: emailOrPhoneNumber}) 

    if(!foundUserByEmail && !foundUserByPhoneNumberText && !foundUserByPhoneNumberTextWithCode){
        return res.status(401).send({message: "No account has been created with this email or phone number"})
    } 

    const foundUser = foundUserByEmail || foundUserByPhoneNumberText || foundUserByPhoneNumberTextWithCode
    if(!bcrypt.compareSync(password, foundUser.password)){
        return res.status(401).send({message: "Password is incorrect"})
    } 

    res.send({user: foundUser, token: generateToken(foundUser)})
 }


 export const confirmEmail = async(req,res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        } 
        const data ={
            ...foundUser, 
            isVerified: true
        }
        req.body.confirmationType === "signin" ? updateUserFunc(res, foundUser,data):
        req.body.confirmationType === "reset" ? res.send({resetToken:generateToken(foundUser), user: {} }):
        null
        
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to confirm email"})
    }
}