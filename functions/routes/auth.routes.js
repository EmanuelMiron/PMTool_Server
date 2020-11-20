const middleware = require("../middlewares/verifyRegister");
const controller = require("../controllers/auth.controller");

module.exports = app => {
    app.post(
        "/auth/register",
        middleware.verifyRegister,
        controller.register
    )
}