var restaurant = require('../../models/RestaurantOwnerModel')

const placeOrder = async (args) => {
    let returnStatus = null
    let outputOrder = []
    let orderDetails = {}
    let j = 0
    var arr = args.orderDetails.split(','); 

    for (var i = 0 ; i< arr.length; i += 3 ){
        orderDetails.dishName = arr[i]
        orderDetails.quantity = parseInt(arr[i+1])
        orderDetails.price =  parseFloat(arr[i+2])

        outputOrder[j] = orderDetails
        orderDetails = {}
        j = j+1
        console.log("Output order", outputOrder)
    }
    console.log("After converting orders", outputOrder)

    let ordersObject = {
        customerID: args.customerID,
        customerName: args.customerName,
        customerImage: args.customerImage,
        totalPrice: args.totalPrice,
        delivery_status: args.delivery_status,
        deliveryFilter: args.deliveryFilter,
        orderDetails: outputOrder
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