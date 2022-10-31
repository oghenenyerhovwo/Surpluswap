import ProductObject from "../../../models/productModel/index.js";
import Product from "../../../models/productModel.js";

// get product
export const getProducts = async(req, res) => {
    try {
        const products= await Product.find()
        res.send({products}) 
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get all Product"})
    }
}

// get product
export const getProduct = async(req, res) => {
    try {
        const productId= req.params.id
        const {category, subCategory} = req.params
        const ProductModeInCategory = ProductObject[category][subCategory]
        const foundProduct= await ProductModeInCategory.findById(productId)
        if(foundProduct){
            const product = await ProductModeInCategory.findById(productId).populate("author").populate("numberOfInterests")
            res.send({product})
        } else {
            res.status(404).send({message: "Product not found"})
        }    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get this Product"})
    }
}