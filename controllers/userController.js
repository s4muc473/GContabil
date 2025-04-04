const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const newUser = new User({ password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

exports.authUser = async (req, res) => {
  try {
    const { password } = req.params;
    const findPassword = await User.findOne({ password: password });

    if (!findPassword) {
      res.status(404).json({
        status: 0,
        msg: "Incorrect Password"
      })
    } else {
      res.status(404).json({
        status: 1,
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'ERRO NA ROTA AUTH-USER', error });
  }
};

