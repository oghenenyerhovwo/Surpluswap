import User from "../../../models/userModel.js"
import Transaction from "../../../models/transactionModel.js";

import { findUser } from "./userFunctions.js"

import { isAdmin, isAuthor } from "../../../utils/index.js"

const deleteActivitiesOfAccount = async (Model, account) => {
    const allActivities = await Model.find().populate("author")
    allActivities.forEach(async activity => {
            if(activity.author && (String(activity.author._id )=== String(account._id))){
                await Model.findByIdAndDelete(activity._id);
            }
        });
}

export const getUser = async(req, res) => {
    try {
        const foundUser= await User.findById(req.params.id);
        
        if(!foundUser){
            return res.status(404).send({message: "User was not Found"})
        }
        res.status(200).send({user: foundUser})    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}


export const getUsers = async(req, res) => {
    try {
        const superAdminUsers= await User.find({adminRole: "super"});
        const adminUsers= await User.find({role: "admin"});
        const regularUsers= await User.find({role: "client"});
        res.json({users: [...superAdminUsers, ...adminUsers, ...regularUsers]});       
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}

export const deleteUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const foundAuthor = await   findUser({_id: req.params.id})

        if(!foundUser || !foundAuthor){
            return res.status(404).send({message: "Invalid account"})
        } 
        
        if(!isAuthor(foundUser, foundAuthor) && !isAdmin(foundUser) && !isSuperAdmin(foundUser)){
            return res.status(404).send({message: "Only admins or owner of account is allowed"})
        } 
        
        await deleteActivitiesOfAccount(Transaction, foundUser)

        const deletedUser= await User.findByIdAndDelete(req.params.id);
         res.json({id: deletedUser._id}); 
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete account"})
    }
}

export const updateUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const foundAuthor = await   findUser({_id: req.params.id})

        if(!foundUser || !foundAuthor){
            return res.status(404).send({message: "Invalid account"})
        } 

        if(!isAuthor(foundUser, foundAuthor) && !isSuperAdmin(foundUser)){
            return res.status(404).send({message: "Only super admins or owner of account is allowed"})
        } 
        
        const updatedUser= await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({id: updatedUser._id}); 
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update account"})

    }
}     

export const blockUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const foundClient = await   findUser({_id: req.params.id})

        if(!foundUser || !foundClient){
            return res.status(404).send({message: "Invalid account"})
        } 

        if(!isSuperAdmin(foundUser)){
            return res.status(404).send({message: "Only super admins can block accounts"})
        } 

        if(isSuperAdmin(foundClient)){
            return res.status(404).send({message: "Cannot block a super admin"})
        } 
        
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {isBlocked: req.body.isBlocked});
        res.json({id: updatedUser._id}); 
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not update account"})

    }
}     