import Product from '../models/product.js'


// Function that get all products statically
export const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({nbHits: products.length, products})
}

// function that get all products dinamically

export const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({nbHits: products.length, products})
}   