const exp = require("express")
const router = exp.Router()

router.get("/get", (req, res) => {
    // console.log('req.params', req.query)
    const id = req.query.id;
    const name = req.query.name;

    var where = "";
    if (id != undefined) {
        where = ` id = ${id}`
    } else if (name != undefined) {
        where = ` name like '%${name}%'`
    }

    var query = `SELECT * from students where ${where}`;
    console.log(query);
    res.send(req.query)

})


module.exports = router;