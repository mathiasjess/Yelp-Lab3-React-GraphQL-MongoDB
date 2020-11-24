var restaurant = require('../../models/RestaurantOwnerModel')

const placeOrder = async (args) => {
    let returnStatus = null
    let ordersObject = {
        customerID: args.customerID,
        customerName: args.customerName,
        customerImage: args.customerImage,
        totalPrice: args.totalPrice,
        deliveryOption: args.deliveryOption,
        delivery_status: args.delivery_status,
        deliveryFilter: args.deliveryFilter,
        orderDetails: args.orderDetails
    }
    console.log("Add dish", ordersObject)
    await restaurant.updateOne(
        { _id: args.restaurantId }, { $push: { orders: ordersObject } }, (err, result) => {
            if (err) {
                returnStatus = { status: 401, message: "Something went wrong. Please try again" }
            }
            else {
                returnStatus = { status: 200, message: "Placed Order Successfully" }
            }
        });
        
    return returnStatus
}

exports.placeOrder = placeOrder; 