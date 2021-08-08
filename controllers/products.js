import Product from '../models/product.js'


// Function that get all products statically
export const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        price: {$gt: 30}
    })
        .sort('name')
        .select('name price')

    res.status(200).json({nbHits: products.length, products})
}

// function that get all products dinamically

export const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query // destrctured query parameters
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
    
    // Numeric filters
    if (numericFilters){
        // operator map between query and mongo operators
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '=': '$eq',
            '>=': '$gte',
            '<=': '$lte'
        }
        // regex that match the operators
        const regEx = /\b(<|>|=|>=|<=)\b/g
        // create the filter by replacing the query operators with mongo operators
        const filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        
        // List of filters options
        const options = ['price', 'rating']

        // create the filters query
        filters.split(',').forEach(item =>{
            // Split each item of the Numeric fields by ',' to get the field and the operator and the value
            const [field, operator, value] = item.split('-') 
            // check if the field is in the options
            if (options.includes(field)){
                queryObject[field] = {
                    [operator]: Number(value)
                }
            }
        })
        console.log(queryObject)
    }
  

    // create the result var with find
    let result = Product.find(queryObject)

    // Add sort to the object if exist
    if (sort){
        const sortList = sort.split(',').join(' ') // get sort list
        result = result.sort(sortList) // append sort to the result
    }  else {
        // if no sort giving we sort by created date
        result = result.sort('createAt')
    }
    

    // Select according of the fields if given
    if (fields) {
        const fieldsList = fields.split(',').join(' ') // get fields list
        result = result.select(fieldsList) // append fields to the result
    }

    // Pagination
    const page = Number (req.query.page) || 1 // get the page number
    const limit = Number (req.query.limit) || 10 // get the limit number
    const skip = (page - 1) * limit // calculate the skip number

    result = result.skip(skip).limit(limit) // apply the limit and skip to the result to get the pagination

    const products = await result // run result query

    res.status(200).json({nbHits: products.length, products})
}   