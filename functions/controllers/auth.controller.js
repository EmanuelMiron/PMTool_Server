// from config/auth.config.js is exported a secretkey in the following format:
// module.exports = {
//     secret: "SomeString"
// }

const config = require("../config/auth.config");
const helper = require("../helpers/validateEmail");

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

    if(!helper.validateEmail()){
        res.status(400).json({message: "Please provide a valid email adress"});
        return;
    }

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
    const {
        username,
        password
    } = req.body;

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