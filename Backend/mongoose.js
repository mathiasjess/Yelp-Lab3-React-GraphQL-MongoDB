var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://userID: password@mongodb atlas url",
    { useNewUrlParser: true, poolSize: 100 }, (err) => {
        if (err) console.log(err);
        else console.log("Connected to MongoDB.")
    });

module.exports = { mongoose };