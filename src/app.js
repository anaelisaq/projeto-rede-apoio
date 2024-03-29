const express = require("express")
const app = express()
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")

app.use(cors())

require("dotenv-safe").config()

const db = require("./database/mongoConfig")
db.connect()

const swaggerDocument = require("./swagger.json")
const professionalRouter = require("./routes/professionalRouter")
const textRouter = require("./routes/textRouter")
const index = require("./routes/indexRouter")

app.use(express.json())
app.use("/", index)
app.use("/professionals", professionalRouter)
app.use("/texts", textRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

module.exports = app