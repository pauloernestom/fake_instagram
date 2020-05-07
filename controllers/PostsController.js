const { sequelize, Post, Comentario, Usuario } = require('../models');

const PostsController = {

    store: async (req, res) => {
        let {texto, usuarios_id, posts_id} = req.body;
        const newPost = await Post.create({texto, usuarios_id, posts_id});
        
        res.redirect('/home');
    },

}


module.exports = PostsController;