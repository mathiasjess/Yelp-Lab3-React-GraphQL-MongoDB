var customer = require('../../models/Customer')

const updateCustomerProfile = async (args) => {
    let savedProfile = null
    const updateObject = {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        DOB :args.DOB,
        location: args.location,
        city: args.city,
        state: args.State,
        country: args.country,
        nickName: args.nickName,
        phoneNumber: args.phoneNumber,
        thingsILove: args.thingsILove,
        findmeIn: args.findmeIn,
        websiteDetails: args.websiteDetails,
        favourites: args.favourites,
        headline: args.headline,
        zipcode: args.zipcode
    }
    console.log("The args for updated customer", updateObject)
    await customer.updateOne({_id:args.customerId}, updateObject, (err, result) => {
        console.log("result", result);
        if (err) {
            savedProfile = { status: 401, message: "Something went wrong. Please try again" }
        }
        else {
            savedProfile = { status: 200, message: "Updated Profile" }
            // res.json(returnObject);
        }
    });
    console.log("Saved Profile", savedProfile)
    return savedProfile
}

exports.updateCustomerProfile = updateCustomerProfile; 