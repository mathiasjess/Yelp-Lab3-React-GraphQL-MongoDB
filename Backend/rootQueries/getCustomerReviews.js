var restaurant = require('../models/RestaurantOwnerModel')

const getCustomerReviews = async (args) => {

    let returnObject = {}
    await restaurant.find({ 'reviews.customerID': args.customerID },
        { 'reviews': 1, _id: 0 , restaurantName: 1}, (err, result) => {
            if (err) {
                console.log("No data found")
            }
            else {
                returnObject = result
            }
        })
    // console.log("Review results", returnObject)
    return returnObject
}

exports.getCustomerReviews = getCustomerReviews; 