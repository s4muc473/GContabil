const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const balanceSchema = new mongoose.Schema({
    totalEntries: {
        type: Number, 
        required: true,
    },
    totalExits: {
        type: Number,
        default: 0,
    },
});

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
