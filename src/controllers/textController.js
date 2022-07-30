const TextSchema = require("../models/textSchema")

const createText = async (req, res) => {
    try {
        const { textContent } = req.body
        const newText = await TextSchema.create({ textContent })
        const savedText = await newText.save()

        if(savedText){
            res.status(201).send({
                message: "Texto cadastrado com sucesso",
                "statusCode": 201,
                savedText
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getAll = async (req, res) => {
    try {
        const texts = await TextSchema.find()
        res.status(200).json({
            message: "Lista de textos cadastrados:",
            texts,
            statusCode: 200
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const text = await TextSchema.findById(id)

        if(text == undefined || id == " "){
            return res.status(404).json({
                message: "Id não encontrado.",
                "statusCode": 404
            })
        }

        return res.status(200).json(text)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getRandom = async (req, res) => {
    try {
        const random = Math.floor(Math.random() * TextSchema.length)
        const randomText = await TextSchema.findOne().skip(random)
    
        return res.status(200).json({
            message: "Aqui está sua mensagem aleatória para iluminar seu dia ✨",
            randomText
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const updateById = async (req, res) => {
    try {
        const { textContent } = req.body
        const text = await TextSchema.findById(req.params.id)

        if(!text) {
            return res.status(404).json({
                message: "Texto não encontrado",
                statusCode: 404
            })
        }

        text.textContent = textContent || text.textContent

        const updatedText = await text.save()

        res.status(200).json({
            message: "Texto cadastrado com sucesso",
            statusCode: 200,
            updatedText
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteText = async (req, res) => {
    try {
        const text = await TextSchema.findById(req.params.id)

        if(!text) {
            return res.status(404).json({
                message: "Texto não encontrado.",
                statusCode: 404
            })
        }

        await text.delete()
        res.status(200).json({
            message: "Texto deletado com sucesso.",
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createText,
    getAll,
    getById,
    getRandom,
    updateById,
    deleteText
}