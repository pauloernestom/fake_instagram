const { Usuario } = require('../models')
const bcrypt = require('bcrypt')

const UsuarioController = {
    
    showCadastro: (req,res) => {
        res.render('auth/register');
    },

    store: async(req, res) =>{
        let {email, nome, userName, senha} = req.body;
        let hashPassword = bcrypt.hashSync(senha, 10);

        await Usuario.create({nome, email, senha:hashPassword});
        res.redirect('/');

    },
};


module.exports = UsuarioController;

