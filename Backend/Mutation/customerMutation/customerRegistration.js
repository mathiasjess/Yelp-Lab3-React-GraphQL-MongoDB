var customer = require('../../models/Customer')

var bcrypt = require('bcryptjs');
const saltRounds = 10;

const customerRegister = async (args) => {
    var existingUser = null
    await customer.find({ email: args.email }, function (err, response) {
        if (response.length >= 1) {
            existingUser = { status: 401, message: "User already exists. Enter a unique email" }
        }
        else {
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
                        firstName : args.firstName,
                        lastName : args.lastName,
                        email: args.email,
                        password: value
                    }
                    console.log("My object", myObj)
                    const newcustomer = new customer(myObj);
                    let savedcustomer = newcustomer.save()
                    if (savedcustomer) {
                        existingUser = { status: 200, message: "Registered successfully" }
                    }
                    else {
                        existingUser = { status: 401, message: "Something went wrong, Try Again." }
                    }
                })
        }
    })
    console.log("Existing user", existingUser)
    return existingUser
}

exports.customerRegister = customerRegister; 