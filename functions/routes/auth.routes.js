module.exports = app => {
    app.get("/register", (req, res) => {
        res.status(200).json({message: "Testing"});
        return;
    })
}