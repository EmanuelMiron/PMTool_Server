const db = require('../config/db.config');

exports.verifyRegister = (req, res, next) => {

    // Destructure the request body
    const {username, email} = req.body;

    // Check if the user provided is already taken
    db.collection("users")
        .where("username", "==", username)
        .get()
        .then(data => {
            if(data.size > 0){
                res.status(400).json({message: "User is already taken!"});
                return;
            }

            // Check if the email provided is already taken
            db.collection("users")
                .where("email", "==", email)
                .get()
                .then(data => {
                    if(data.size > 0){
                        res.status(400).json({message: "Email is already taken!"});
                        return;
                    }

                    // If the username and email are not taken we can continue
                    next();
                })
                .catch(err => {
                    res.status(500).json({Error: err});
                    return;
                })
        })
        .catch(err => {
            res.status(500).json({Error: err});
            return;
        })
}