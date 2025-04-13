const Exit = require('../models/exits');
const BalanceController = require('./balanceController')
const Balance = require('../models/balance');

exports.newExit = async (req, res) => {
    try {
        const { cause, value, type, observation } = req.body;
        const newExit = new Exit({ cause, value, type, observation });
        await newExit.save();

        const exitValue = Number(value);
        const totalExits = await BalanceController.getTotalExits();
        const add = exitValue + totalExits;

        await Balance.findOneAndUpdate(
            {},
            { $set: { totalExits: add } },
            { new: true}
        );

        res.status(201).json({
            Transação: newExit,
            Montante: totalExits+exitValue
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao Criar Nova Saida', error });
        console.log(error);
    }
};

exports.getExits = async (req, res) => {
    try {
        const Exits = await Exit.find();
        res.status(200).json(Exits);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Exits', error });
    }
};

exports.deleteExit = async (req, res) => {
    try {
        const { id, value } = req.params;

        const deletedExit = await Exit.deleteOne({ _id: id });

        if (deletedExit.deletedCount === 0) {
            return res.status(404).json({
                message: "Exit não encontrada para deletar.",
                status: "0"
            });
        }

        const totalExit = await BalanceController.getTotalExits();
        const add = totalExit - value;

        await Balance.findOneAndUpdate(
            {},
            { $set: { totalExits: add } },
            { new: true}
        );

        res.status(200).json({
            message: "Exit deletada com sucesso.",
            status: "1",
            Montante: totalExit,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao deletar Exit', error });
    }
};