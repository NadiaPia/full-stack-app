const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models")

router.get("/", async (req, res) => {   //(router.get("/)   ...express see this as "/posts"
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    res.json(listOfPosts)
})

router.post("/", async (req, res) => {
    const post = req.body;     //post.title; post.postText; post.userNAme
    await Posts.create(post);  //we call sequelize function to create post by inserting this data to our dbtable
    res.json(post)
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id) //find by primary key, that is id in column in db. This is the method of the sequilize
    res.json(post)
})

module.exports = router;