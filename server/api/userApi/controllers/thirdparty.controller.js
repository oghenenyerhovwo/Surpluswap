// modules
import bcrypt from "bcryptjs"
import  { OAuth2Client } from 'google-auth-library';

import User from "../../../models/userModel.js"
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


// functions and middleware
import { generateToken }  from "../../../utils/index.js"
import { findUser } from "./userFunctions.js"

const sendUser = async (req, res, email, name) => {
    try {
        const foundUser = await findUser({email:email})
        if(!foundUser){
            const newUser= {
                email: email,
                fullName: name,
                isVerified: true,
                password: bcrypt.hashSync(process.env.SECRET_PASSWORD, 8)
            }
            const createdUser = await User.create(newUser)
            res.send({user: createdUser, token: generateToken(newUser),})
        } else {
            // const user = await db.user.upsert({ 
            //     where: { email: email },
            //     update: { name, picture },
            //     create: { name, email, picture }
            // })
            res.send({user: foundUser, token: generateToken(foundUser),})
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
        const { email, name } = ticket.getPayload(); 
        console.log(ticket.getPayload())
        sendUser(req, res, email, name) 
        
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Unable to sign up user"})
    }
   
}