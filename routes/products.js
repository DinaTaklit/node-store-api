import express from 'express'
import {getAllProducts, getAllProductsStatic} from './../../controllers/products'

const router = express.Router // to create routes

router.route('/').get(getAllProducts) // Route to get Products with dinamic queries
router.route('/static').get(getAllProductsStatic) // Static route to get products

export default router
