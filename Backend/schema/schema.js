const { GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLInputObjectType,
} = require('graphql')

const restaurant = require('../models/RestaurantOwnerModel')
const {restaurantOwnerType, ordersType } = require('../graphQLSchema/restaurantGQLSchema')

const { restaurantRegister } = require('../Mutation/restaurantMutation/restaurantRegistration')
const { restaurantLogin } = require('../Mutation/restaurantMutation/restaurantLogin')
const { updateRestaurantProfile } = require('../Mutation/restaurantMutation/updateRestaurantProfile')
const { addMenu } = require('../Mutation/restaurantMutation/addMenu')
const { fetchRestaurantOrderSummary } = require('../rootQueries/fetchRestaurantOrderSummary')
const { updateOrderStatus } = require('../Mutation/restaurantMutation/updateOrderStatus')


const customer = require('../models/Customer')
const customerType = require('../graphQLSchema/customerGQLSchema')


const { customerRegister } = require('../Mutation/customerMutation/customerRegistration')
const { customerLogin } = require('../Mutation/customerMutation/customerLogin')
const { updateCustomerProfile } = require('../Mutation/customerMutation/updateCustomerProfile')
const { searchForRestaurant } = require('../rootQueries/searchForRestaurant')
const { fetchCustomerOrderSummary } = require('../rootQueries/fetchCustomerOrderSummary')
const { getCustomerReviews } = require('../rootQueries/getCustomerReviews')
const { writeReview } = require('../Mutation/customerMutation/writeReview')
const { placeOrder } = require('../Mutation/customerMutation/placeOrder')


//Restaurant type

const statusType = new GraphQLObjectType({
    name: "Status",
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
})

// Root Query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restaurantsDetails: {
            type: new GraphQLList(restaurantOwnerType),
            resolve(parent, args) {
                return restaurant.find({}, (err, result) => {
                    if (err) {
                        throw err
                    }
                    else {
                        // console.log("Result", result)
                        return result
                    }
                })

            }
        },
        restaurantDetails: {
            type: new GraphQLList(restaurantOwnerType),
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                console.log("Id", args._id)
                return restaurant.find({ _id: args._id }, (err, result) => {
                    if (err) {
                        throw err
                    }
                    else {
                        console.log("Restaurant Result", result)
                        return result
                    }
                })
            }
        },
        fetchRestaurantOrderSummary: {
            type: new GraphQLList(ordersType),
            args: { restaurantID: { type: GraphQLString } },
            async resolve(parent, args) {
                return await fetchRestaurantOrderSummary(args)
            }
        },
        customersDetails: {
            type: new GraphQLList(customerType),
            resolve(parent, args) {
                return customer.find({}, (err, result) => {
                    if (err) {
                        throw err
                    }
                    else {
                        // console.log("Result", result)
                        return result
                    }
                })

            }
        },
        customerDetails: {
            type: new GraphQLList(customerType),
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return customer.find({ _id: args._id }, (err, result) => {
                    if (err) {
                        throw err
                    }
                    else {
                        console.log("Customer Result")
                        return result
                    }
                })
            }
        },
        searchRestaurant: {
            type: new GraphQLList(restaurantOwnerType),
            args: { searchParameter: { type: GraphQLString } },
            async resolve(parent, args) {
                return await searchForRestaurant(args)
            }
        },
        fetchCustomerOrderSummary: {
            type: new GraphQLList(restaurantOwnerType),
            args: { customerID: { type: GraphQLString } },
            async resolve(parent, args) {
                return await fetchCustomerOrderSummary(args)
            }
        },
        getcustomerReviews: {
            type: new GraphQLList(restaurantOwnerType),
            args: { customerID: { type: GraphQLString } },
            async resolve(parent, args) {
                return await getCustomerReviews(args)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        restaurantRegistration: {
            type: statusType,
            args: {
                restaurantName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                zipcode: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await restaurantRegister(args)
            }
        },
        restaurantLogin: {
            type: statusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await restaurantLogin(args)
            }
        },
        updateRestaurant: {
            type: statusType,
            args: {
                restaurantId: { type: GraphQLString },
                restaurantName: { type: GraphQLString },
                email: { type: GraphQLString },
                description: { type: GraphQLString },
                contact: { type: GraphQLString },
                timings: { type: GraphQLString },
                curbPickup: { type: GraphQLBoolean },
                dineIn: { type: GraphQLBoolean },
                yelpDelivery: { type: GraphQLBoolean },
                location: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                zipcode: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await updateRestaurantProfile(args)
            }
        },
        addDish: {
            type: statusType,
            args: {
                restaurantId: { type: GraphQLString },
                dishName: { type: GraphQLString },
                dishIngredients: { type: GraphQLString },
                dishDescription: { type: GraphQLString },
                price: { type: GraphQLFloat },
                dishCategory: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await addMenu(args)
            }
        },
        customerRegistration: {
            type: statusType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await customerRegister(args)
            }
        },
        customerLogin: {
            type: statusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await customerLogin(args)
            }
        },
        updateCustomer: {
            type: statusType,
            args: {
                customerId: { type: GraphQLString },
                email: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                DOB: { type: GraphQLString },
                location: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                nickName: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                thingsILove: { type: GraphQLString },
                findmeIn: { type: GraphQLString },
                websiteDetails: { type: GraphQLString },
                favourites: { type: GraphQLString },
                headline: { type: GraphQLString },
                zipcode: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await updateCustomerProfile(args)
            }
        },
        writeReviews: {
            type: statusType,
            args: {
                restaurantId: { type: GraphQLString },
                customerID: { type: GraphQLString },
                customerName: { type: GraphQLString },
                ratings: { type: GraphQLString },
                comments: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await writeReview(args)
            }
        },
        placeOrder: {
            type: statusType,
            args: {
                restaurantId: { type: GraphQLString },
                customerID: { type: GraphQLString },
                customerName: { type: GraphQLString },
                customerImage: { type: GraphQLString },
                totalPrice: { type: GraphQLString },
                deliveryOption: { type: GraphQLString },
                delivery_status: { type: GraphQLString },
                deliveryFilter: { type: GraphQLString },
                orderDetails: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return await placeOrder(args)
            }
        },
        updateOrderStatus: {
            type: statusType,
            args: {
                orderID :  { type: GraphQLString }, 
                delivery_status: { type: GraphQLString },
                deliveryFilter: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await updateOrderStatus(args)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
