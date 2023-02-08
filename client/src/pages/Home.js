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

  return (
    <div>
      {listOfPosts.map((value, key) => {
      return (
        <div className="post" key={key} onClick={() => {navigate(`/post/${value.id}`)}}>                                                 {/*we add onClick ivent on every post in order to get a data from them */}
          <div className="title"> {value.title} </div>
          <div className="id"> {value.id} </div>                   {/*is crated automaticaly in the db in the 1st column */}
          <div className="body"> {value.postText} </div>
          <div className="footer"> {value.userNAme} </div>
        </div>
      );
      })} 
    </div>
  )
}

export default Home
