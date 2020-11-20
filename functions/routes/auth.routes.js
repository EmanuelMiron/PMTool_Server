const middleware = require("../middlewares/verifyRegister");

module.exports = app => {
    app.post("/register", middleware.verifyRegister, (req, res) => {
        res.status(200).json({message: "User can be registered!"});
        return;
    })
}