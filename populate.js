import dotenv from 'dotenv' 
import connectDB from './db/connect.js' // import connectDB function to connect to the database 
import Product from './models/product.js' // import Product model
import jsonProducts from './products.json'

// env configuration
dotenv.config()

// Function that populate the database: if the collection already exist we remove it and create a new one.

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI) // connect to the database
        await Product.deleteMany() // remove the collection if it exists
        await Product.create(jsonProducts) // create a new collection
        console.log('The database is populated successfully!!!')
        process.exit(0) // success exit
    } catch (error) {
        console.error(error)
        process.exit(1) // error exit
    }
}

start()