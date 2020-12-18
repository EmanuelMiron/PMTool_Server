const db = require("../config/db.config");

exports.createNewCheckList = (req, res) => {
    const newCheckList = {
        numberOfTasks,
        shortDescription,
        title,
    } = req.body

    newCheckList.userId = req.user.id;

    db.collection("checkLists")
        .add(newCheckList)
        .then(() => {
            res.status(200).json({
                message: "CheckList created successfully!"
            })
            return;
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
            return;
        })


}