import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';



function Profile() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState} = useContext(AuthContext)            //don't foget to import useContext from 'react'



    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`). then((response) => {
            setUserName(response.data.userNAme);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`). then((response) => {
            setListOfPosts(response.data); 

        })
    }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {userName}</h1>
        {authState.userName === userName && <button>Change My Password</button>}
      </div>

      <div className="listOfPosts">
      {listOfPosts.map((value, key) => {
      return (
        <div className="post" key={key}>   {/*we add onClick ivent on every post in order to get a data from them */}
          <div className="title"> {value.title} </div>
          <div className="id"> {value.id} </div>     {/*is crated automaticaly in the db in the 1st column */}
          <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText} </div>          
          
          <div className="footer">
            <div className="username">{value.userNAme}</div>

            <div className="buttons">     
              <label>{value.Likes.length}</label> {/*because we have an access to the likes data as we joined Posts and  Likes table, see at server -> Posts.js -> router.get...{inclede: [Likes]} */}
            </div>
          </div>

        </div>
      );
      })} 
      </div>

    </div>
  )
}

export default Profile
