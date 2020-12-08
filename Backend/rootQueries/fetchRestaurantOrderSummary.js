var restaurant = require('../models/RestaurantOwnerModel')

const fetchRestaurantOrderSummary = async (args) => {
    let returnObject = null
    console.log("Inside restaurant Order Summary");
    await restaurant.findById({_id : args.restaurantID}, { 'orders': 1, _id: 0 }, (err, result) => {
        if (err) {
            console.log("No data found")
        }
        else {
            returnObject = result
        }
    })  
    console.log("Restaurant return", JSON.stringify(returnObject))
    return returnObject
}

exports.fetchRestaurantOrderSummary = fetchRestaurantOrderSummary; 