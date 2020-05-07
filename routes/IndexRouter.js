var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage ({
    destination: (req, file, cb) =>{
        cb(null, path.join('public', 'img', 'publicacoes'));
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);

    }
});
let upload = multer({ storage: storage})

const AuthController = require("../controllers/AuthController");
const VerificaUsuarioLogado = require('../middlewares/VerificaUsuarioLogado')
const HomeController = require('../controllers/HomeController');
const PostsController = require('../controllers/PostsController');
const UsuarioController = require('../controllers/UsuarioController');

router.get('/', AuthController.showLogin);

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/home',VerificaUsuarioLogado, HomeController.show);
router.post('/home', VerificaUsuarioLogado, upload.any(), HomeController.postar);
router.post('/curtir', VerificaUsuarioLogado, HomeController.curtir);
router.post('/comentarios', VerificaUsuarioLogado, HomeController.comentar);


router.post('/posts', VerificaUsuarioLogado, PostsController.store);


router.get('/registro', UsuarioController.showCadastro);
router.post('/registro', UsuarioController.store);

module.exports = router;
