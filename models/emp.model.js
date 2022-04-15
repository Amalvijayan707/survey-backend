const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    firstName: {
        type:String,
        required: true,

    },
    middleName: {
        type:String,
        required: true,

    },   
    lastName: {
        type:String,
        required: true,

    },
    age: {
        type:Number,
        required: true,


    }
    
})

const empModel = mongoose.model('employ', empSchema);
module.exports = empModel