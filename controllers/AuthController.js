const { Usuario } = require('../models')
const bcrypt = require('bcrypt')

const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: (req,res) => {
        console.log(req.session.usuario);
        res.render('index');
    },

    login: async (req,res) =>{
        // Lendo as info do body
        const { email, senha } = req.body;
        
        //Tentar carregar um usuário
        const user = await Usuario.findOne({ where: { email } });  


        // Verificar se existe usuario com email passado
        if(!user){
            res.redirect('/login?error=1');
        }

        // Validar a senha passada via post contra a guardada no banco
        if(!bcrypt.compareSync(senha, user.senha)){
            res.redirect('/login?error=1');
        }

        // Setar uma session com o usuario
        req.session.usuario = user;
        
        //Redirecionar o usuario para a rota home
        res.redirect('/home')

    }


}

module.exports = AuthController;