const Entrie = require('../models/entries');
const BalanceController = require('./balanceController')
const Balance = require('../models/balance');

exports.newEntrie = async (req, res) => {
    try {
        const { cause, value, description, observation } = req.body;
        const newEntrie = new Entrie({ cause, value, description, observation });
        await newEntrie.save();

        const entrieValue = Number(value);
        const totalEntries = await BalanceController.getTotalEntries();
        const add = entrieValue + totalEntries;

        await Balance.findOneAndUpdate(
            {},
            { $set: { totalEntries: add } },
            { new: true}
        );

        res.status(201).json({
            Transação: newEntrie,
            Montante: totalEntries+entrieValue
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Criar Nova entrada', error });
        console.log(error)
    }
};

exports.getEntries = async (req, res) => {
    try {
        const entries = await Entrie.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Entries', error });
        console.log(error);
    }
};

exports.deleteEntrie = async (req, res) => {
    try {
        const { id, value } = req.params;

        const deletedEntrie = await Entrie.deleteOne({ _id: id });

        if (deletedEntrie.deletedCount === 0) {
            return res.status(404).json({
                message: "Entrie não encontrada para deletar.",
                status: "0"
            });
        }

        const totalEntries = await BalanceController.getTotalEntries();
        const add = totalEntries - value;

        await Balance.findOneAndUpdate(
            {},
            { $set: { totalEntries: add } },
            { new: true}
        );

        res.status(200).json({
            message: "Entrie deletada com sucesso.",
            status: "1",
            Montante: totalEntries,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar Entrie', error });
    }
};
