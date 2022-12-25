// modules
import bcrypt from "bcryptjs"

import User from "../../../models/userModel.js"


// functions and middleware
import { generateToken, sendConfirmationEmail, sendPasswordResetEmail }  from "../../../utils/index.js"
import { findUser } from "./userFunctions.js"

export const signUp = async(req, res) => {
    try {
        const {email, phoneNumberTextWithCode, userName} = req.body
        
        // check if username already exists
        const foundUserByUsername = await findUser({userName: userName}) 
        if(foundUserByUsername){
            return res.status(401).send({message: `${userName} has been used previously`})
        }

        // check if email already exists
        const foundUserByEmail = await findUser({email: email}) 
        if(foundUserByEmail){
            return res.status(401).send({message: `${email} has been used previously`})
        }

        // check if phone number already exists
        const foundUserByPhoneNumberText = await findUser({phoneNumberTextWithCode: phoneNumberTextWithCode}) 
        if(foundUserByPhoneNumberText){
            return res.status(401).send({message: `${phoneNumberTextWithCode} has been used previously`})
        }

        

        const newUser= {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 8)
        }
        const createdUser = await User.create(newUser)
        const signInToken = generateToken(({user: createdUser, tokenType: "sign_in"}))
        const emailToken = generateToken({user: createdUser, tokenType: "email_verify"})
        res.send({user: createdUser, token: signInToken})
        createdUser.email && sendConfirmationEmail(createdUser.email, createdUser.firstName, emailToken)

    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to sign up user"})
    }
   
}

export const signIn = async(req, res) => {
    try {
        const {emailOrUsernameOrPhoneNumber, password} = req.body
    
        const foundUserByEmail = await findUser({email: emailOrUsernameOrPhoneNumber}) 
        const foundUserByUsername = await findUser({userName: emailOrUsernameOrPhoneNumber}) 
        const foundUserByPhoneNumberText = await findUser({phoneNumberText: emailOrUsernameOrPhoneNumber}) 
        const foundUserByPhoneNumberTextWithCode = await findUser({phoneNumberTextWithCode: emailOrUsernameOrPhoneNumber}) 
    
        if(!foundUserByEmail && !foundUserByUsername && !foundUserByPhoneNumberText && !foundUserByPhoneNumberTextWithCode){
            return res.status(401).send({message: "No account has been created with this email, username or phone number"})
        } 
    
        const foundUser = foundUserByEmail || foundUserByUsername || foundUserByPhoneNumberText || foundUserByPhoneNumberTextWithCode
        if(!bcrypt.compareSync(password, foundUser.password)){
            return res.status(401).send({message: "Password is incorrect"})
        } 
    
        res.send({user: foundUser, token: generateToken(({user: foundUser, tokenType: "sign_in"}))})
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to sign in user"})
    }
 }

 export const resendEmail = async(req, res) => {
    try {
        const { email, type } = req.body
    
        const foundUser = await findUser({email: email}) 
    
        if(!foundUser){
            return res.status(401).send({message: "No account has been created with this email"})
        } 


        const emailToken = generateToken({user: foundUser, tokenType: type})

        if(type === "email_verify") {
            const { isMessageSent } = await sendConfirmationEmail(foundUser.email, foundUser.firstName, emailToken)
            if(!isMessageSent){
                return res.status(401).send({message: "Message was not sent"})
            }
            return res.send({isMessageSent: true})
        } 
       

        
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to resend email"})
    }
 }
