var restaurant = require('../../models/RestaurantOwnerModel')

const updateRestaurantProfile = async (args) => {
    let savedProfile = null
    const updateObject = {
        restaurantName : args.restaurantName,
        email : args.email,
        description : args.description,
        contact : args.contact,
        timings : args.timings,
        curbPickup : args.curbPickup,
        dineIn : args.dineIn,
        yelpDelivery : args.yelpDelivery
    }
    await restaurant.findByIdAndUpdate(args.restaurantId, updateObject, (err, result) => {
        console.log("result", result);
        if (err) {
            savedProfile = { status: 401, message: "Something went wrong. Please try again" }
        }
        else {
            savedProfile = { status: 200, message: "Updated Profile" }
            // res.json(returnObject);
        }
    });
    console.log("Saved Profile", savedProfile)
    return savedProfile
}

exports.updateRestaurantProfile = updateRestaurantProfile;