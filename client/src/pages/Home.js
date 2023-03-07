import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react" //useEffect will allow to run a function immediately when 
                                //the page reranders (when we open a webpage we can see all posps right away in it)
                                
import { useNavigate } from 'react-router-dom';


function Home() {
  
  const [listOfPosts, setListOfPosts] = useState([]);

  let navigate = useNavigate() //we have to call this useNavigate only once here via defining it as a variable
  
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);      
    }) 

  }, []);

  const likeAPost = (postId) => {
    axios.post(
      "http://localhost:3001/likes", 
      {PostId: postId}, 
      {headers: {accessToken: localStorage.getItem("accessTokenn")}}
      )
      .then((response) => {
        
        setListOfPosts(listOfPosts.map((post) => {
          if(post.id === postId) {
            if (response.data.liked) {              
              return {...post, Likes: [...post.Likes, 0]} //we change the Likes field by adding 0 to the end of the Liakes array
            } else {
              const likesArray = post.Likes
              likesArray.pop() //delete the last element
              return {...post, Likes: likesArray}
            }
          } else {
            return post;
          }
        }))
      })

  };



  return (
    <div>
      {listOfPosts.map((value, key) => {
      return (
        <div className="post" key={key}>                                                 {/*we add onClick ivent on every post in order to get a data from them */}
          <div className="title"> {value.title} </div>
          <div className="id"> {value.id} </div>                   {/*is crated automaticaly in the db in the 1st column */}
          <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText} </div>
          <div className="footer">
             {value.userNAme}
             <button onClick={() => {likeAPost(value.id)}}>Like</button>
             <label>{value.Likes.length}</label> {/*because we have an access to the likes data as we joined Posts and Likes table, see at server -> Posts.js -> router.get...{inclede: [Likes]} */}
          </div>
        </div>
      );
      })} 
    </div>
  )
}

export default Home
