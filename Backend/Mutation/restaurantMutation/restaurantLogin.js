var restaurant = require('../../models/RestaurantOwnerModel')
const jwt = require('jsonwebtoken')
const { secret } = require('../../utils/config')

var bcrypt = require('bcryptjs');
const saltRounds = 10;


const restaurantLogin = async (args) => {
    let loginresult = null;
    var savedLogin = null;
    email = args.email
    password = args.password
    console.log(password)

    await restaurant.find({ email: email }, function (error, result) {
        console.log(result[0])
        if (!result[0]) {
            // returnObject.message = "nouser";
            // res.json(returnObject);
            savedLogin = { status: 401, message: "No user" }
        }
        else {
            loginresult = result[0]
            console.log(loginresult.password)
            bcrypt.compare(password, loginresult.password, (err, result) => {
                console.log("Password result", result)
                if (result === true) {
                    const payload = { _id: loginresult._id, email: loginresult.email, role: 'restaurant', name: loginresult.restaurantName };
                    console.log(payload)
                    const token = jwt.sign(payload, secret, {
                        expiresIn: 1008000
                    });
                    savedLogin = { status: 200, message: "JWT " + token }
                }
                else {
                    savedLogin = { status: 401, message: "Invalid credentials" }
                }
            })
        }
    });


    // new Promise((resolve, reject) => {
    //         restaurant.find({ email: email }, function (error, result) {
    //         console.log(result[0])
    //         if (!result[0]) {
    //             // returnObject.message = "nouser";
    //             // res.json(returnObject);
    //             savedLogin = { status: 401, message: "No user" }
    //         }
    //         loginresult = result[0]
    //         resolve(result[0])
    //     });
    // })
    //     .then((value) => {
    //         new Promise((resolve, reject) => {
    //             bcrypt.compare(password, value.password, (err, result) => {
    //                 if (err) throw err;
    //                 resolve([result, value]);
    //             })
    //         })
    //             .then((value) => {
    //                 if (value[0]) {
    //                     const payload = {_id: loginresult._id, email:loginresult.email, role:'restaurant', name: loginresult.restaurantName};
    //                     console.log(payload)
    //                     const token = jwt.sign(payload, secret, {
    //                         expiresIn : 1008000
    //                     });
    //                     savedLogin = { status: 401, message : "JWT "+ token }
    //                     // returnObject.message = "success";
    //                     // returnObject.data = value[1]
    //                     // returnObject.token = "JWT "+ token
    //                     // res.status(200).end("JWT "+ token)
    //                 }
    //                 else {
    //                     savedLogin = { status: 200, message : "Invalid credentials" }
    //                 }

    //             })
    //     })
    console.log("Login results", savedLogin)
    return savedLogin
}

exports.restaurantLogin = restaurantLogin