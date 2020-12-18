const controller = require("../controllers/checkList.controller");
const middleware = require('../middlewares/verifyToken');

module.exports = app => {
    app.post(
        "/checklist/newchecklist",
        middleware.verifyToken,
        controller.createNewCheckList
    )

    app.put(
        "/checklist/:id",
        middleware.verifyToken,
        controller.updateCheckList
    )
}