const mongoose = require("mongoose")

const professionalSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: false
    },
    proBono: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("professional", professionalSchema)