// from config/auth.config.js is exported a secretkey in the following format:
// module.exports = {
//     secret: "SomeString"
// }

const config = require("../config/auth.config");
const helper = require("../helpers/validators");

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require("../config/db.config");

exports.register = (req, res) => {
    // Destructure the request body
    const newUser = {
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    const { valid, errors } = helper.validateRegister(newUser);
    if(!valid) return res.status(400).json(errors);

    db.collection("users")
        .add({
            username,
            email,
            password: bcrypt.hashSync(password, 8)
        })
        .then(() => {
            res.status(200).json({
                message: "User has been registered successfully!"
            });
            return;
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            });
            return;
        })
}

exports.login = (req, res) => {
    // Destructure request body
    const user = {
        username,
        password
    } = req.body;

    const {
        valid,
        errors
    } = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);

    // Check if the User exists
    db.collection("users")
        .doc(username)
        .get()
        .then(doc => {
            if (!doc.exists) {
                res.status(404).json({
                    message: "User not found!"
                })
                return;
            }

            const passwordIsValid = bcrypt.compareSync(password, doc.data().password);

            if (!passwordIsValid) {
                res.status(401).json({
                    message: "Inccorect password!",
                    accessToken: null
                });
                return;
            }

            var token = jwt.sign({
                id: username
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            })

            res.status(200).send({
                username,
                accessToken: token
            })
        })
        .catch(err => {
            console.error("Error: ", err);
            res.status(500).json({
                Error: err
            });
            return;
        })
}