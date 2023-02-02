const express = require("express");
const router = express.Router();
const { Posts } = require("../models")

router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)
})

router.post("/", async (req, res) => {
    const post = req.body;     //post.title; post.postText; post.userNAme
    await Posts.create(post);  //we call sequilize function to create post by inserting this data to our dbtable
    res.json(post)
});

module.exports = router;