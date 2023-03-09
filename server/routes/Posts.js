const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddlewares");


router.get("/", validateToken, async (req, res) => {   //(router.get("/)   ...express see this as "/posts"
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({where: { UserId: req.user.id }})  //will return likes that were done by particular user to know whether he already liked the post that he is going to like
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
})

router.post("/", validateToken, async (req, res) => {
    const post = req.body;     //post.title; post.postText;  //post.userNAme -  we don't have it in req.body any more   
    post.userNAme = req.user.userName
    await Posts.create(post);  //we call sequelize function to create post by inserting this data to our dbtable
    res.json(post)
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(post)
})

router.delete("/:postId", validateToken, async(req,res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
            
    });
    res.json("DELETED SUCCESFULLY")

})

module.exports = router;