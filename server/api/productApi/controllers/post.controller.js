import Product from "../../../models/productModel.js";
import ProductObject from "../../../models/productModel/index.js";
import { isAgent, isAdmin, isAuthor } from "../../../utils/index.js"

// create product
export const createProduct = async(req, res) => {
    try {
        const user= req.user

        const ProductModeInCategory = ProductObject[req.body.category][req.body.subCategory]

        const newProductInCategory = await ProductModeInCategory.create({...req.body, author: user._id})
        
        const newProduct = await Product.create({
            category: newProductInCategory.category,
            subCategory: newProductInCategory.subCategory,
            productId: newProductInCategory._id,
            tags:   [
                newProductInCategory.condition && newProductInCategory.condition, 
                newProductInCategory.facilities.length > 0 && newProductInCategory.facilities[0],
                newProductInCategory.facilities.length > 1 && newProductInCategory.facilities[1],
                newProductInCategory.facilities.length > 2 && newProductInCategory.facilities[2],
            ],
            price: newProductInCategory.price,
            priceDuration: newProductInCategory.priceDuration,
            country: newProductInCategory.country,
            state: newProductInCategory.state,
            lga: newProductInCategory.lga,
            image: newProductInCategory.images[0].url,
            title: newProductInCategory.title,
            interests: newProductInCategory.interests.length,
            views: newProductInCategory.views.length,
            isPriceNegotiable: newProductInCategory.isPriceNegotiable,
        })
        res.send({id: newProduct._id})     
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Product"})
    }
}

// update Product
export const updateProduct = async(req, res) => {
    try {
        const productId= req.params.id
        const foundProduct=await Product.findById(productId).populate("author")
        if(foundProduct){
            const author= foundProduct.author
            const user= req.user
            // check if the current user owns the Product or is an admin
            if(!isAuthor(user, author) && !isAdmin(user)){
                return res.status(404).send({message: "You need to be the owner or an admin to do that"})
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body)
            res.send({id: updatedProduct._id})  
        } else {
            res.status(404).send({message: "Product not found"})
        }
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Product"})
    }
}

// delete Product
export const deleteProduct = async(req, res) => {
    try {
        const productId= req.params.id
        const foundProduct=await Product.findById(productId).populate("author")
        if(foundProduct){
            const user= req.user
            // only admin can delete
            if(!isAdmin(user)){
                return res.status(404).send({message: "You need to be the owner or an admin to do that"})
            }
            const deletedProduct = await Product.findByIdAndDelete(productId, req.body)
            res.send({id: deletedProduct._id})  
        } else {
            res.status(404).send({message: "Product not found"})
        }
           
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not create Product"})
    }
}