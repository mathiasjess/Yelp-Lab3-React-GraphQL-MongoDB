const { GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema,
} = require('graphql')

// const restaurant = require('./models/RestaurantOwnerModel')

const restaurantOwnerType = new GraphQLObjectType({
    name: "restaurantOwner",
    fields: () => ({
        _id : {type : GraphQLString},
        restaurantName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        contact: { type: GraphQLString },
        location: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        timings: { type: GraphQLString },
        description: { type: GraphQLString },
        curbPickup: { type: GraphQLBoolean },
        dineIn: { type: GraphQLBoolean },
        yelpDelivery: { type: GraphQLBoolean },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        menuItem : {type: new GraphQLList(menuType)},
        events: { type: new GraphQLList(eventsType)},
        reviews: {type: new GraphQLList(reviewsType)},
        orders: {type: new GraphQLList(ordersType)}
        // menuItem: {
        //     type: new GraphQLList(menuType),
        //     resolve(parent, args) {
        //         return parent.menuItem
        //     }
        // },
        // events: {
        //     type: new GraphQLList(eventsType),
        //     resolve(parent, args) {
        //         return parent.events
        //     }
        // },
        // reviews: {
        //     type: new GraphQLList(reviewsType),
        //     resolve(parent, args) {
        //         return parent.reviews
        //     }
        // },
        // orders: {
        //     type: new GraphQLList(ordersType),
        //     resolve(parent, args) {
        //         return parent.orders
        //     }
        // }
    })
})

const menuType = new GraphQLObjectType({
    name: "menuItem",
    fields: () => ({
        _id : {type : GraphQLString},
        dishCategory: { type: GraphQLString },
        dishName: { type: GraphQLString },
        dishDescription: { type: GraphQLString },
        dishIngredients: { type: GraphQLString },
        price: { type: GraphQLString }
    })
})

const eventsType = new GraphQLObjectType({
    name: "events",
    fields: () => ({
        _id : {type : GraphQLString},
        eventName: { type: GraphQLString },
        eventDescription: { type: GraphQLString },
        eventTime: { type: GraphQLString },
        eventDate: { type: GraphQLString },
        eventLocation: { type: GraphQLString },
        eventHashtag: { type: GraphQLString },
        registeredUsers: {
            type: new GraphQLList(registeredusersType),
            resolve(parent, args) {
                return parent.registeredUsers
            }

        }
    })
})

const registeredusersType = new GraphQLObjectType({
    name: "registeredUsers",
    fields: () => ({
        customerID: { type: GraphQLString },
        customerName: { type: GraphQLString }
    })
})


const reviewsType = new GraphQLObjectType({
    name: "reviews",
    fields : () =>({
        _id : {type : GraphQLString},
        customerID: { type: GraphQLString },
        customerName: { type: GraphQLString },
        customerImage: { type: GraphQLString },
        ratings: { type: GraphQLFloat },
        comments: { type: GraphQLString },
        reviewDate: { type: GraphQLString },
    })
})

const ordersType = new GraphQLObjectType({
    name : "orders",
    fields : () =>({
        _id : { type: GraphQLString },
        customerID: { type: GraphQLString },
        customerName: { type: GraphQLString },
        customerImage: { type: GraphQLString },
        totalPrice: { type: GraphQLFloat },
        deliveryOption: { type: GraphQLString },
        delivery_status: { type: GraphQLString },
        deliveryFilter: { type: GraphQLString },
        orderDate: { type: GraphQLString },
        orderDetails : {
            type: new GraphQLList(orderDetailsType),
            resolve(parent, args) {
                return parent.orderDetails
            }
        }
    })
})

const orderDetailsType = new GraphQLObjectType({
    name : "orderDetails",
    fields : () => ({
            dishName: { type: GraphQLString },
            price: { type: GraphQLFloat },
            quantity: { type: GraphQLInt}
    })
})

module.exports = { restaurantOwnerType, ordersType}