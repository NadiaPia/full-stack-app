import React from 'react';
import { useEffect, useState } from "react" //useEffect will allow to run a function immediately when 

import { useParams } from 'react-router-dom';
import axios from 'axios';


 

function Post() {

    let { id } = useParams();  //now the program knows what to get as useParams
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    
    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
            setPostObject(response.data)       
            
        }) 

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {  //we need keep ${id} as we need our comment appear in the same page as the post
        setComments(response.data)
            
        }) 
    
      }, []);

      const addComment = () => {
        axios
            .post("http://localhost:3001/comments", {
                commentBody: newComment, 
                PostId: id
            }, 
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessTokenn")          //accessToken the same name as in the server in the middleware const accessToken

                }
            } 
            )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const commentToAdd = { commentBody: newComment }; //each comment is an object, containing commentBody and a PostId, and here, we need only commentBody
                    setComments([...comments, commentToAdd]); //it makes a new post added automatically, but not after refresh
                    setNewComment("")
                }

        })
      }
     
      
  return (
    <div className="postPage" >
        <div className="leftSide">
            <div className="post" id="individual">
                <div className="title">{postObject.title}</div>
                <div className="body">{postObject.postText}</div>
                <div className="footer">{postObject.userNAme}</div>
            </div>
       </div>
       <div className="rightSide">
        <div className="addCommentContainer">
            <input 
                type='text' 
                placeholder='Comment...' 
                autoComplete='off'
                value={newComment} //to make an input field clean after adding a comment
                onChange={(event) => {
                    setNewComment(event.target.value)
                }}
            />
            <button onClick={addComment}>Add Comment</button>
        </div>

        <div className="listOfComments">
            {comments.map((comment, key) => {
                return <div key={key} className="comment">{comment.commentBody}</div>
                
            })}
        </div>

       </div>
    </div>
  )
}

export default Post;
 