import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext } from "react" //useEffect will allow to run a function immediately when 
//the page reranders (when we open a webpage we can see all posps right away in it)
                                
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../helpers/AuthContext';



function Home() {
  
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext)
  
  let navigate = useNavigate() //we have to call this useNavigate only once here via defining it as a variable
  
  useEffect(() => {
    if (!authState.status) {
      navigate("/login")
    } else {

      axios.get("http://localhost:3001/posts", {headers: {accessToken: localStorage.getItem("accessTokenn")}}).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId
          }) ); //now we have the list of likes(that containes the id of Posts) that were done by the particular user
        //console.log("response.data.likedPosts", response.data.likedPosts) //Array(2){id: 17, createdAt: '2023-03-07T01:11:14.000Z', updatedAt: '2023-03-07T01:11:14.000Z', PostId: 2, UserId: 18}
  
      }) 
    }

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
        }));

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => {
            return id != postId;
          }))

        } else {
          setLikedPosts([...likedPosts, postId])
        }
         
      })
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
      return (
        <div className="post" key={key}>   {/*we add onClick ivent on every post in order to get a data from them */}
          <div className="title"> {value.title} </div>
          <div className="id"> {value.id} </div>     {/*is crated automaticaly in the db in the 1st column */}
          <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText} </div>
          
          
          <div className="footer">
            <div className="username">{value.userNAme}</div>

            <div className="buttons">              
              <ThumbUpIcon onClick={() => {likeAPost(value.id)}}
                className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
              />             
              <label>{value.Likes.length}</label> {/*because we have an access to the likes data as we joined Posts and  Likes table, see at server -> Posts.js -> router.get...{inclede: [Likes]} */}
            </div>
          </div>




        </div>
      );
      })} 
    </div>
  )
}

export default Home
