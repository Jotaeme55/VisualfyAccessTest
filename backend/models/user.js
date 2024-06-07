const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:"Project"
        }
    ]
}); 

module.exports = mongoose.model('User', userSchema);