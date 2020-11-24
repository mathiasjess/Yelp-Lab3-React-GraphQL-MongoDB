
var restaurant = require('../../models/RestaurantOwnerModel')

const updateOrderStatus = async (args) => {
    let returnObject = null
    await restaurant.updateOne({ 'orders._id': args.orderID },
        {
            '$set': {
                'orders.$.delivery_status': args.delivery_status,
                'orders.$.deliveryFilter': args.deliveryFilter
            }
        }, (err, result) => {
            if (err) {
               returnObject =  { status: 401, message: "Something went wrong. Please try again" }
            }
            else {
                returnObject = { status: 200, message: "Updated Order Status" }
            }
        });
    return returnObject
}

exports.updateOrderStatus = updateOrderStatus; 