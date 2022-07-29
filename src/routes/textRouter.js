const express = require("express")
const routes = express.Router()
const controller = require("../controllers/textController")

routes.get("/all", controller.getAll)
routes.get("/random", controller.getRandom)
routes.get("/:id", controller.getById)
routes.post("/new", controller.createText)
routes.put("/update/:id", controller.updateById)
routes.delete("/delete/:id", controller.deleteText)

module.exports = routes