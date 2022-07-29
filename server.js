const app = require("./src/app")
const PORT = process.env.PORT || 9090

app.listen(PORT, () => console.log(`Servidor na porta ${PORT} :)`))