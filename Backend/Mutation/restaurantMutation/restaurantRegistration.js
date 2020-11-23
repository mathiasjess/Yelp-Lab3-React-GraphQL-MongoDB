var restaurant = require('../../models/RestaurantOwnerModel')
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
});

var bcrypt = require('bcryptjs');
const saltRounds = 10;

const restaurantRegister = async (args) => {
    var existingUser = null
    await restaurant.find({ email: args.email }, function (err, response) {
        if (response.length >= 1) {
        existingUser =  { status: 401, message: "User already exists. Enter a unique email" }
        }
        else {
            let lat = null
            let lon = null
            let address = args.location + ',' + args.city + ',' + args.state
            console.log("address", address)
            // Geocode an address.
            googleMapsClient.geocode({
                address: address
            }, function (err, response) {
                if (!err) {
                    console.log(response.json.results)
                    lat = response.json.results[0].geometry.location.lat
                    lon = response.json.results[0].geometry.location.lng
                    new Promise((resolve, reject) => {
                        bcrypt.genSalt(saltRounds, (err, salt) => {
                            if (err) throw err;
                            bcrypt.hash(args.password, salt, (err, encrypted) => {
                                if (err) throw err;
                                resolve(encrypted)
                            })
                        })
                    })
                        .then((value) => {
                            let myObj = {
                                restaurantName: args.restaurantName,
                                email: args.email,
                                password: value,
                                location: args.location,
                                city: args.city,
                                state: args.state,
                                country: args.country,
                                zipcode: args.zipcode,
                                latitude: lat,
                                longitude: lon,
                            }
                            console.log("My object", myObj)
                            const newRestaurant = new restaurant(myObj);
                            let savedRestaurant = newRestaurant.save()
                            if(savedRestaurant){
                                existingUser = { status: 200, message: "Registered successfully" }
                            }
                            else {
                                existingUser =  { status: 401, message: "Something went wrong, Try Again." }
                            }
                        })
                }
            })
        }
    })
    console.log("Existing user", existingUser)
    return existingUser
}

exports.restaurantRegister = restaurantRegister; 
// module.exports = restaurantRegister;