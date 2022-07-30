const mongoose = require("mongoose")

const textSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    textContent: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model("text", textSchema)