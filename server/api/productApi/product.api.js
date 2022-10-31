import express from "express";
import { isAuth } from "../../utils/index.js"

import { createProduct, getProduct, getProducts, updateProduct } from "./controllers/index.js";


const router = express.Router();

// get Product
router.get(
    "/", 
    (req, res) => {
        getProducts(req, res)
});

// create Product
router.post(
    "/", 
    isAuth,
    (req, res) => {
        createProduct(req, res)
});

// get Product
router.get(
    "/:category/:subCategory/:id", 
    (req, res) => {
        getProduct(req, res)
});

// update Product
router.put(
    "/:id", 
    isAuth,
    (req, res) => {
        updateProduct(req, res)
});


export default router;