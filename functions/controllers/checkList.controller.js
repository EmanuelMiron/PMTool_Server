const db = require("../config/db.config");

// Create new Checklist

// Format :
// {
//     title: "Some Title",
//     shortDescription: "Short Description",
//     tasks: ["task1", "task2", "task3"],
//     numberOfTasks: 3,
//     userId: 'adkfjhadkfjabdfkasj'
// }

exports.createNewCheckList = (req, res) => {

    const newCheckList = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        tasks: req.body.tasks,
        numberOfTasks: req.body.tasks.length,
        userId : req.user.id
    }

    db.collection('checkLists')
    .add(newCheckList)
    .then(() => {
        res.status(200).json({message: "Checklist created successfully!"});
    })
    .catch(err => {
        res.status(500).json({message: "Server error", error: err});
    })
}

// Read all checklists

exports.getCheckLists = (req, res) => {

    const userId = req.user.id;
    const data = [];

    db.collection('checkLists')
    .where('userId', '==', userId)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            data.push(doc.data());
        })
    })
    .then(() => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({message: "Server error", error: err});
    })
}

// Get singular checklist by id

exports.getCheckList = (req, res) => {
    const checkListId = req.params.id;
    const userId = req.user.id;

    db
        .collection('checkLists')
        .doc(checkListId)
        .get()
        .then(doc => {
            if (doc.exists) {
                if (userId === doc.data().userId) {

                    res.status(200).json(doc.data());

                } else {
                    return res.status(401).json({ message: 'Unauthorized!' })
                }
            } else {
                return res.status(404).json({ message: "CheckList not found" });
            }
        })
        .catch(err => {
            res.status(500).json({message: "Server error", error: err});
        })
}

// Update checklist by id

exports.updateCheckList = (req, res) => {
    const checkListId = req.params.id;
    const userId = req.user.id;

    const updatedCheckList = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        tasks: req.body.tasks,
        numberOfTasks: req.body.tasks.length
    }

    const checkListRef = db.collection('checkLists').doc(checkListId)

    checkListRef
        .get()
        .then(doc => {
            if (doc.exists) {
                if (userId === doc.data().userId) {
                    checkListRef
                        .update(updatedCheckList)
                        .then(() => {
                            res.status(200).json({ message: "CheckList updated sucessfully!" })
                        })
                        .catch(err => {
                            res.status(500).json({ error: err })
                        })

                } else {
                    return res.status(401).json({ message: 'Unauthorized!' })
                }

            } else {
                return res.status(404).json({ message: "CheckList not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// Delete checklist by id

exports.deleteCheckList = (req, res) => {
    const checkListId = req.params.id;
    const userId = req.user.id;

    const checkListRef = db.collection("checkLists").doc(checkListId)


    checkListRef
        .get()
        .then(doc => {
            if (doc.exists) {
                if (userId === doc.data().userId) {

                    checkListRef
                        .delete()
                        .then(() => {
                            res.status(200).json({ message: "CheckList deleted successfully" })
                        })
                        .catch(err => {
                            res.status(500).json({ error: err })
                        })

                } else {
                    return res.status(401).json({ message: 'Unauthorized!' })
                }

            } else {
                return res.status(404).json({ message: "CheckList not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}