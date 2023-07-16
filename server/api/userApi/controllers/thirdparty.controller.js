// modules
import bcrypt from "bcryptjs"
import  { OAuth2Client } from 'google-auth-library';

import User from "../../../models/userModel.js"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


// functions and middleware
import { generateToken }  from "../../../utils/index.js"
import { findUser } from "./userFunctions.js"

const sendUser = async (req, res, userDetails) => {
    try {
        const foundUser = await findUser({email:userDetails.email})
        if(!foundUser){
            const newUser= {
                ...userDetails,
                password: bcrypt.hashSync(process.env.SECRET_PASSWORD, 8)
            }
            const createdUser = await User.create(newUser)
            res.send({user: createdUser, token: generateToken({user: newUser, tokenType: "sign_in"}),})
        } else {
            // const user = await db.user.upsert({ 
            //     where: { email: email },
            //     update: { name, picture },
            //     create: { name, email, picture }
            // })
            res.send({user: foundUser, token: generateToken({user: foundUser, tokenType: "sign_in"}),})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to sign up user"})
    }
    
}

export const GoogleSignIn = async(req, res) => {
    try {
        const { token }  = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        const { email,  given_name, family_name } = ticket.getPayload();
        const userDetails = {
            firstName: given_name,
            lastName: family_name,
            userName: given_name,
            email,
            phoneNumberText: "Not available",
            phoneNumberTextWithCode: "Not available",
        }
        sendUser(req, res, userDetails) 
        
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to logging with google"})
    }
   
}