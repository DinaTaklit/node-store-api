import dotenv from 'dotenv'
import express from 'express'

// imort Database files
import connectDB from './db/connect.js'

// import Middlawares files
import notFoundMiddleware from './middleware/not-found.js'
import errorMiddleware from './middleware/error-handler.js'

// import Routes
import productRouter from './routes/products.js'

// Congifure the envirement 
dotenv.config()

// Global variable
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

// Create the app 
const app = express()

// Middlewares
app.use(express.json()) // to use json body requests

// routes
// root route
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})
  
// route to products api
app.use('/api/v1/products', productRouter)

// Product Middlewares
app.use(notFoundMiddleware) // handle none existing routes
app.use(errorMiddleware) // handle errors


// Function to start the server
const start = async () => {
    try {
        // conncetDB
        await connectDB(MONGO_URI)
        // If we successfuly connect the db we listen to the given port
        app.listen(PORT, console.log(`Server is listening to the port ${PORT} ...`))
    } catch (error) {
        console.error(error)
    }
}

start()