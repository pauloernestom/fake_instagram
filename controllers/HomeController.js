const { Post, Comentario, Usuario } = require('../models')
const bcrypt = require('bcrypt')


const HomeController =  {



    
    show: async (req,res) => {
        
        let user = req.session.usuario;
        // let comentarios = await Comentario.findAll({include:['post','usuario']});
        // let posts = await Post.findAll({include:['comentario', 'usuario']})

        let posts = await Post.findAll({include:
            [
                {
                    model:Comentario,
                    as:'comentarios',
                    include:'usuario'
                },
                'usuario'
        
            ]})
        
        // res.render('index', {comentarios, posts});
            
        res.render('index', {posts,user});
    },

    postar: async (req, res) => {
        let {texto, usuarios_id} = req.body;
        let { files } = req;
        const newPost = await Post.create({texto, img:'/img/'+ files[0].originalname, usuarios_id, n_likes:0});
        res.redirect('/home');
    },

    comentar: async (req, res) => {
        let {texto, usuarios_id, posts_id} = req.body;
        const newComment = await Comentario.create({texto, usuarios_id, posts_id});
        
        res.redirect('/home');
    },

    curtir: async (req, res) => {
        let { id } = req.body;
        let nLikes = await Post.findAll({ where: { id }});

        console.log(nLikes);
        

        await Post.update({ n_likes: nLikes[0].n_likes + 1 }, {
            where: {id}
        });
        
        res.redirect('/home');
    },
}

module.exports = HomeController;





// <!-- <% if(comentario.post.id == post.id){ %> -->