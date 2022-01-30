const mongoose = require('mongoose')

const documentSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
    },
    name: {
        type: String
    }
})

const document = mongoose.model('document',documentSchema)
module.exports = document