const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    payed: Boolean,
    file: mongoose.Schema.Types.String,
    demo: String,
    token: String,
    user_id_asociated: {
        type: String,
        required: true,
    },
    creationDate:{
        type: Date,
        default: Date.now,
    }
}); 

module.exports = mongoose.model('Project', projectSchema);