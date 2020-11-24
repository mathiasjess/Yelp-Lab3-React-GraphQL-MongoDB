const { GraphQLObjectType,
    GraphQLString,
} = require('graphql')

const customerType = new GraphQLObjectType({
    name: "customer",
    fields: () => ({
        _id : {type : GraphQLString},
        email : { type: GraphQLString },
        password : { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        DOB : { type: GraphQLString },
        location :{ type: GraphQLString },
        city : { type: GraphQLString },
        state : { type: GraphQLString },
        country : { type: GraphQLString },
        zipcode : { type: GraphQLString },
        nickName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        yelpingSince:{ type: GraphQLString },
        thingsILove: { type: GraphQLString },
        findmeIn:{ type: GraphQLString },
        websiteDetails: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        favourites: { type: GraphQLString },
        headline: { type: GraphQLString }
    })
})


module.exports = customerType