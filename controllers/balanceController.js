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


exports.getTotalEntriesServer = async (req, res) => {
    try {
        res.status(200).json({
            total: await this.getTotalEntries()
        })
    } catch (error) {
        res.status(500).json({erro:"ERRO AO BUSCAR TOTAL EM ENTRADAS"})
        console.log(error);
    }
}

exports.getTotalExitsServer = async (req, res) => {
    try {
        res.status(200).json({
            total: await this.getTotalExits()
        })
    } catch (error) {
        res.status(500).json({erro:"ERRO AO BUSCAR TOTAL EM SAIDAS"})
        console.log(error);
    }
}

exports.getBalance = async (req, res) => {
    try {
        const totalP = await Balance.findOne({}, 'totalEntries'); 
        let totalEntries = totalP ? totalP.totalEntries : 0; 

        const totalN = await Balance.findOne({}, 'totalExits'); 
        let totalExits = totalN ? totalN.totalExits : 0; 

        res.status(200).json({
            balance: totalEntries-totalExits
        });
    } catch (error) {
        console.error('Erro', error);
        throw error;
    }
}