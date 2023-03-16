import React from 'react';
import { useEffect, useState, useContext } from "react" //useEffect will allow to run a function immediately when
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';




function Post() {

    let { id } = useParams();  //now the program knows what to get as useParams
    const [postObject, setPostObject] = useState({});
    //console.log("postObject", postObject) //{id: 19, title: 'tttttttttttt', postText: 'yyyyyyyyyyy', userNAme: 'Petia', createdAt: '2023-03-16T03:32:29.000Z', …}
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const {authState} = useContext(AuthContext)
    let navigate = useNavigate()

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
                        accessToken: localStorage.getItem("accessTokenn")   //accessToken the same name as in the server in the middleware const accessToken
                    }
                }
            )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    console.log(response.data)
                    const commentToAdd = { 
                        commentBody: newComment, 
                        username: response.data.username, //we put username into the response in server side 
                     }; //each comment is an object, containing commentBody and a PostId, and here, we need only commentBody
                    setComments([...comments, commentToAdd]); //it makes a new post added automatically, but not after refresh
                    setNewComment("")
                }
            })
    }

    const deleteComment = (id) => {
        axios.delete (`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessTokenn")},
        }). then(() => {
            setComments(comments.filter((val) => {
                return val.id !== id; //
            }));
        });

    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessTokenn")},
        } ).then(() => {
            navigate("/")
        })

    }

    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title"); //when click on the title, the alert window pop up
            axios.put(`http://localhost:3001/posts/title`, {
                newTitle: newTitle, 
                id: id
            }, 
            {
                headers: { accessToken: localStorage.getItem("accessTokenn")},
            });
            setPostObject({...postObject, title: newTitle});
        } else {
            let newPostText = prompt("Enter New Text");
            axios.put(`http://localhost:3001/posts/postText`, {
                newText: newPostText, 
                id: id
            }, 
            {
                headers: { accessToken: localStorage.getItem("accessTokenn")},
            });
            setPostObject({...postObject, postText: newPostText})
        }
    }

    return (
        <div className="postPage" >
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title" onClick={() => {if (authState.userName === postObject.userNAme) {editPost("title")}}}>{postObject.title}</div>
                    <div className="body" onClick={() => {editPost("body")}}>{postObject.postText}</div>
                    <div className="footer">
                        {postObject.userNAme}

                        {authState.userName === postObject.userNAme && 
                            (<button onClick={() => deletePost(postObject.id)}>
                                Delete Post
                            </button>)} {/*only the owner of the post are able to see a delete button */}
                        </div>
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
                        return <div key={key} className="comment">
                            {comment.commentBody}
                            <label>Username: {comment.username}</label>
                            {authState.userName === comment.username &&  <button onClick={() => {deleteComment(comment.id)}}>X</button>} {/*we know the "comment.id" from the comment(map) and we pass it as an argument to this function */}
                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;
