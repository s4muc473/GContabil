const Balance = require('../models/balance');

exports.getTotalEntries = async () => {
    try {
        const total = await Balance.findOne({}, 'totalEntries'); 
        return total ? total.totalEntries : 0; 
    } catch (error) {
        console.error('Erro ao buscar totalEntries:', error);
        throw error;
    }
};

exports.getTotalExits = async () => {
    try {
        const total = await Balance.findOne({}, 'totalExits'); 
        return total ? total.totalExits : 0; 
    } catch (error) {
        console.error('Erro ao buscar totalExits:', error);
        throw error;
    }
};

exports.getBalance = async (req, res) => {
    try {
        const totalP = await Balance.findOne({}, 'totalEntries'); 
        let totalEntries = totalP ? totalP.totalEntries : 0; 

        const totalN = await Balance.findOne({}, 'totalExits'); 
        let totalExits = totalN ? totalN.totalExits : 0; 

        res.status(200).json(totalEntries-totalExits);
    } catch (error) {
        console.error('Erro', error);
        throw error;
    }
}