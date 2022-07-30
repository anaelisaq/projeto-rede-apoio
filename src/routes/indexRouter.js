const express = require("express");
const routes = express.Router();

routes.get("/",  (req, res) => {
    res.status(200).send({
        title: "Projeto final: Rede de Apoio: Aldeia Virtual - Todas em Tech turma On15 - {reprograma}",
        mensagem: "Olá, seja bem vindx à minha API Rest. Sinta-se confortável para pesquisar sobre profissionais que possam lhe ajudar nesse processo de maternidade solo. Não deixe de pegar uma mensagem aleatória para iluminar seu dia ✨",
    })
})

module.exports = routes