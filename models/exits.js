const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const exitSchema = new mongoose.Schema({
    cause: { 
        type: String, 
        required: true
    },
    value: { 
        type: Types.Decimal128, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now, 
        required: true 
    },
    type: { 
        type: String, 
        required: false, 
        trim: true 
    },
    observation: { 
        type: String, 
        required: false, 
        trim: true 
    }
});

const Exit = mongoose.model('Exit', exitSchema);

module.exports = Exit;
