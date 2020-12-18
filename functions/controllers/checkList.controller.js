const {
    doc
} = require("../config/db.config");
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

exports.updateCheckList = (req, res) => {
    const checkListId = req.params.id;
    const userId = req.user.id;

    const updatedCheckList = {
        shortDescription,
        title
    } = req.body

    const checkListRef = db.collection('checkLists').doc(checkListId)


    checkListRef
        .get()
        .then(doc => {
            if (doc.exists) {
                if (userId === doc.data().userId) {
                    checkListRef
                        .update(updatedCheckList)
                        .then(() => {
                            res.status(200).json({
                                message: "CheckList updated sucessfully!"
                            })
                        })
                        .catch(err => {
                            console.error("Error", err);
                            res.status(500).json({
                                error: err
                            })
                        })

                } else {
                    console.log("NOpe!");
                    return res.status(401).json({
                        message: 'Unauthorized!'
                    })
                }

            } else {
                return res.status(404).json({message: "CheckList not found"});
            }
        })
        .catch(err => {
            console.error("Error", err);
            res.status(500).json({
                error: err
            })
        })
}