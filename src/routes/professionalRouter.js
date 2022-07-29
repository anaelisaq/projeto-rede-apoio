const express = require("express")
const routes = express.Router()
const controller = require("../controllers/professionalController")

routes.get("/search", controller.getAll)
routes.get("/search-occupation", controller.getByOccupation)
routes.get("/search-gender", controller.getByGender)
routes.get("/search-probono", controller.getByProBono)
routes.get("/search/:id", controller.getById)
routes.post("/register", controller.register)
routes.put("/update/:id", controller.updateById)
routes.delete("/delete/:id", controller.deleteById)

module.exports = routes