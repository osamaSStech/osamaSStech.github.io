const exp = require("express")
const app = exp()
const kRouter = require("./test.js")
app.use("/home", kRouter)
app.listen(1000);