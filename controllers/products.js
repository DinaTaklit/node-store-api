import Product from '../models/product.js'


// Function that get all products statically
export const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-name price')
    res.status(200).json({nbHits: products.length, products})
}

// function that get all products dinamically

export const getAllProducts = async (req, res) => {
    const {featured, company, name} = req.query // destrctured query parameters
    const queryObject = {} // construct a new query object based on the query we get from the user

    // Check for the existance of query parameters

    // Add featured to the object if exist
    if (featured){
        queryObject.featured = featured
    }

    // Add company to the object if exist
    if (company){
        queryObject.company = company
    }

    // Add name to the object if exist using a regex
    if (name){
        queryObject.name = {$regex: name, $options: 'i'}
    }

    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({nbHits: products.length, products})
}   