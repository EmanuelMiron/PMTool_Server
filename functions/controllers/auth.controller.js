// from config/auth.config.js is exported a secretkey in the following format:
// module.exports = {
//     secret: "SomeString"
// }

const config = require("../config/auth.config");

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require("../config/db.config");

exports.register = (req, res) => {
    // Destructure the request body
    const {
        username,
        email,
        password
    } = req.body;

    db.collection("users")
        .doc(username)
        .set({
            username,
            email,
            password: bcrypt.hashSync(password, 8)
        })
        .then(() => {
            res.status(200).json({message: "User has been registered successfully!"});
            return;
        })
        .catch(err => {
            res.status(500).json({Error : err});
            return;
        })
}