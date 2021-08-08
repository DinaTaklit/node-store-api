import Product from '../models/product.js'


// Function that get all products statically
export const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        page:'2'
    })
    res.status(200).json({nbHits: products.length, products})
}

// function that get all products dinamically

export const getAllProducts = async (req, res) => {
    const {featured, company} = req.query // destrctured query parameters
    const queryObject = {} // construct a new query object based on the query we get from the user

    // Check for the existance of query parameters

    if (featured){
        queryObject.featured = featured
    }

    if (company){
        queryObject.company = company
    }

    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({nbHits: products.length, products})
}   