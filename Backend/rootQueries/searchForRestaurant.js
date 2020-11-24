var restaurant = require('../models/RestaurantOwnerModel')

const searchForRestaurant = async (args) => {
    var returnObject = null;
    // let param1 = req.query[0]
    console.log(args.searchParameter)

    // let param2 = req.query[1]
    if (args.searchParameter === 'Curb Pickup') {
        await restaurant.find({ curbPickup: true }, function (err, docs) {
            if (err) {
                console.log("Not Found")
            }
            else {
                returnObject =  docs
            }
        });
        // console.log("Returning result", returnObject)
        // return returnObject
    }
    else if (args.searchParameter === 'Dine In') {
        await restaurant.find({ dineIn: true }, function (err, docs) {
            if (err) {
                console.log("Not Found")
            }
            else {
                returnObject =  docs
            }
        });
        // console.log("Returning result", returnObject)
        // return returnObject
    }
    else if (args.searchParameter === 'Yelp Delivery') {
        await restaurant.find({ yelpDelivery: true }, function (err, docs) {
            if (err) {
                console.log("Not Found")
            }
            else {
                returnObject =  docs
                // console.log(returnObject)
            }
        });
        // console.log("Returning result", returnObject)
        // return returnObject
    }
    else {
        await restaurant.find({
            "$or": [{
                // 'restaurantName': args.searchParameter + '.*/' }
                'restaurantName': args.searchParameter
            },
            {
                "cusine": args.searchParameter 
            },
            {
                "location": args.searchParameter 
            },
            {
                "city": args.searchParameter 
            },
            {
                "zipcode": args.searchParameter 
            },
            {
                "menuItem.dishName": args.searchParameter 
            }]
        }, (err, result) => {
            if (err) {
                console.log("Not Found")
            }
            else {
                
                returnObject = result
                // console.log("Result", returnObject)
            }
        })
    }
    console.log("Returning result", returnObject)
    return returnObject
}

exports.searchForRestaurant = searchForRestaurant; 