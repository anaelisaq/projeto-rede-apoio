const ProfessionalSchema = require("../models/professionalSchema")

const getAll = async (req, res) => {
    await ProfessionalSchema.find(function (error, professionals) {
        if(error) {
            res.status(500).send({ message: error.message })
        }
            res.status(200).json({ 
                message: "Lista de profissionais cadastrados:",
                professionals,
                statusCode: 200
            })
    })
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const professional = await ProfessionalSchema.findById(id)

        if(professional == undefined || id == " "){
            return res.status(404).json({
                message: "Id não encontrado.",
                "statusCode": 404
            })
        }

        return res.status(200).json(professional)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getByOccupation = async (req, res) => {
    try {
        const occupation = req.query.occupation
        const professionals = await ProfessionalSchema.find({ occupation: occupation })
    
        return res.status(200).send(professionals)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getByProBono = async (req, res) => {
    try {
        const professionals = await ProfessionalSchema.find({ proBono: true })

        return res.status(200).send(professionals)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getByGender = async (req, res) => {
    try {
        const gender = req.query.gender
        const professionals = await ProfessionalSchema.find({ gender: gender })

        return res.status(200).send(professionals)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const register = async (req, res) => {
    try {
        if (!req.body.name && req.body.occupation){
            res.status(404).send({
                message: "Os campos obrigatórios precisam ser preenchidos.",
                "statusCode": 404
            })
        }
        
        const { name, gender, occupation, cost, proBono, phone, } = req.body
        const newUser = await ProfessionalSchema.create({ name, gender, occupation, cost, proBono, phone })
        const savedUser = await newUser.save()

        if(savedUser){
            res.status(201).send({
                message: "Profissional cadastrado com sucesso",
                "statusCode": 201,
                savedUser
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateById = async (req, res) => {
    try {
        const { name, gender, occupation, cost, proBono, phone } = req.body
        const professional = await ProfessionalSchema.findById(req.params.id)

        if(!professional) {
            return res.status(404).json({
                message: "Profissional não encontrado",
                statusCode: 404
            })
        }

        professional.name = name || professional.name
        professional.gender = gender || professional.gender
        professional.occupation = occupation || professional.occu
        professional.cost = cost || professional.cost
        professional.proBono = proBono || professional.proBono
        professional.phone = phone || professional.phone

        const updatedProfessional = await professional.save()

        res.status(200).json({
            message: "Profissional atualizado com sucesso",
            statusCode: 200,
            updatedProfessional
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteById = async (req, res) => {
    try {
        const professional = await ProfessionalSchema.findById(req.params.id)

        if(!professional) {
            return res.status(404).json({
                message: "Profissional não encontrado.",
                statusCode: 404
            })
        }

        await professional.delete()
        res.status(200).json({
            message: "Profissional deletado com sucesso.",
            statusCode: 200
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByOccupation,
    getByProBono,
    getByGender,
    register,
    updateById,
    deleteById
}