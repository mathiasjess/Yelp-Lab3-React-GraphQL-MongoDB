var restaurant = require('../../models/RestaurantOwnerModel')

const writeReview = async (args) => {
    let returnStatus = null
    let addReviewObject = {
        customerID: args.customerID,
        customerName: args.customerName,
        ratings: args.ratings,
        comments: args.comments
    }
    console.log("Add Review", addReviewObject)
    await restaurant.updateOne(
        { _id: args.restaurantId }, { $push: { reviews: addReviewObject } }, (err, result) => {
            if (err) {
                returnStatus = { status: 401, message: "Something went wrong. Please try again" }
            }
            else {
                returnStatus = { status: 200, message: "Added Review" }
            }
        });
    return returnStatus
}

exports.writeReview = writeReview; 