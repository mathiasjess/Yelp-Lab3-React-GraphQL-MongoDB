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
const restaurantOwnerType = require('./restaurantGQLSchema')

const { restaurantRegister } = require('../Mutation/restaurantMutation/restaurantRegistration')
const {restaurantLogin} = require('../Mutation/restaurantMutation/restaurantLogin')
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
                return restaurant.find({ _id: args._id }, (err, result) => {
                    if (err) {
                        throw err
                    }
                    else {
                        console.log("Restaurant Result")
                        return result
                    }
                })
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
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
