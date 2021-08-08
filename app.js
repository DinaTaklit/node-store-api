import dotenv from 'dotenv'
import express from 'express'

// imort Database files
import connectDB from './db/connect.js'

// import Middlawares files
import notFoundMiddleware from './middleware/not-found.js'
import errorMiddleware from './middleware/error-handler.js'

// Congifure the envirement 
dotenv.config()

// // Create the app 
const app = express()

// use Middlewares
app.use(notFoundMiddleware) // handle none existing routes
app.use(errorMiddleware) // handle errors

// app.use(express.json()) // to use json body requests

// Global variable
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

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