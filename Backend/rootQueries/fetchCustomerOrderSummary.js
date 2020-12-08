var restaurant = require('../models/RestaurantOwnerModel')

const fetchCustomerOrderSummary = async (args) => {
    console.log("Inside Customer Order History", args.customerID);
    let returnObject = {};
    await restaurant.find({ 'orders.customerID': args.customerID }, {
        // await restaurant.find({ "orders": { $elemMatch: { customerID: args.customerID } } },{
        _id: 0, 'restaurantName': 1,'orders._id': 1,'orders.customerName':1,'orders.customerID':1, 'orders.totalPrice': 1, 'orders.deliveryOption': 1, 'orders.delivery_status': 1,
        'orders.deliveryFilter': 1, 'orders.orderDetails': 1,'orders.orderDate': 1, 
    }, (err, result) => {
        console.log("Result", result)
        if (err) {
            console.log("No data found")
        }
        else {
            returnObject = result
        }
    })
    console.log("Result of customer orders", returnObject)
    return returnObject
}

exports.fetchCustomerOrderSummary = fetchCustomerOrderSummary; 