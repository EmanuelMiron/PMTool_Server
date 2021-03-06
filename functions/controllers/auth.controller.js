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
    const newUser = {
        firstName,
        email,
    } = req.body;

    // Add Password to newUser

    newUser.password = bcrypt.hashSync(req.body.password, 8)

    // Add lastName if there is one provided
    if (req.body.lastName) {
        newUser.lastName = {
            lastname
        } = req.body
    }


    db.collection("users")
        .add(newUser)
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
        email,
        password
    } = req.body;

    // Check if the User exists
    db.collection("users")
        .where("email", "==", email)
        .get()
        .then(data => {
            const doc = data.docs[0];
            if (doc === undefined) {
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
                id: doc.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            })

            res.status(200).send({
                firstName: doc.data().firstName,
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