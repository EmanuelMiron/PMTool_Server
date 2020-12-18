const controller = require("../controllers/checkList.controller");
const middleware = require('../middlewares/verifyToken');

module.exports = app => {
    app.post(
        "/checklist/newchecklist",
        middleware.verifyToken,
        controller.createNewCheckList
    )
}