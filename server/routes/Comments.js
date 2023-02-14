const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

//(router.get("/)   ...express see this as "/comments"

router.get("/:postId", async (req, res) => {   //we need see a list of comments related to a particular post
    const postId = req.params.postId
    const comments = await Comments.findAll({ where: { PostId: postId }}) 
    res.json(comments);
})

router.post("/", async (req, res) => {
    const comment = req.body;     //comment.title; comment.postText; comment.userName, etc.
    await Comments.create(comment);  //we call sequelize function to create comment by inserting this data to our dbtable
    res.json(comment)
});



module.exports = router;
