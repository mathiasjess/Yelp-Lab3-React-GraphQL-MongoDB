var restaurant = require('../../models/RestaurantOwnerModel')

const addMenu = async (args) => {
    let savedMenu = null
    let addDishObject = {
        dishName: args.dishName,
        dishIngredients: args.dishIngredients,
        dishDescription: args.dishDescription,
        price: args.price,
        dishCategory: args.dishCategory
    }
    await restaurant.updateOne(
        { _id: args.restaurantId }, { $push:{menuItem: addDishObject}}, (err, result) => {
            if (err) {
                savedMenu = { status: 401, message: "Something went wrong. Please try again" }
            }
            else {
                savedMenu = { status: 200, message: "Added dish successfully" }
            }
        });
        console.log("Saved dish", savedMenu)
        return savedMenu

}

exports.addMenu = addMenu;