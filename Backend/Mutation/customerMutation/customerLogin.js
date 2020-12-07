var customer = require('../../models/Customer')
const jwt = require('jsonwebtoken')
const { secret } = require('../../utils/config')

var bcrypt = require('bcryptjs');
const saltRounds = 10;


const customerLogin = async (args) => {
    let loginresult = null;
    var savedLogin = null;
    email = args.email
    password = args.password
    console.log(password)

    await customer.find({ email: email }, function (error, result) {
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
                if (result) {
                    const payload = { _id: loginresult._id, email: loginresult.email, role: 'customer', firstName: loginresult.firstName, lastName:loginresult.lastName  };
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
    return savedLogin
}

exports.customerLogin = customerLogin