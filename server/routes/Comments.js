const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddlewares')

//(router.get("/)   ...express see this as "/comments"

router.get("/:postId", async (req, res) => {   //we need see a list of comments related to a particular post
    const postId = req.params.postId
    const comments = await Comments.findAll({ where: { PostId: postId }}) 
    res.json(comments);
})

//before the server post the comment, after it receiv th request, it go thouh the validateToken middleware, 
// do all the checkes it need. If everyhing is correct and next() function is called, will do the rest actions
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;     //comment.title; comment.postText; comment.userName, etc.
    //console.log("commentcommentcomment", comment)
    const username = req.user.userName; //req.user is from Authmiddleware. We have an access to it because of the  "validateToken"
    comment.username = username; // comment.username - username the same spelling as in the model, now our comment contains a username that will be sent to the comment db with the commentBody
    //console.log("commentcommentcommentusername", comment)
    const x = await Comments.create(comment);  //we call sequelize function to create comment by inserting this data to our dbtable
    res.json(comment)
});

router.delete("/:commentId", validateToken, async (req, res) => {  //validateToken is needed here to allow the only owner of the comment delete their comment
    const commentId = req.params.commentId;

    await Comments.destroy({
        where: {
            id: commentId,
        },
            
    });
    res.json("DELETED SUCCESFULLY")
});



module.exports = router;
