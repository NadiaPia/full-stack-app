import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react" //useEffect will allow to run a function immediately when 
                                //the page reranders (when we open a webpage we can see all posps right away in it)

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
      
    }) 

  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
      return (
        <div className="post" key={key}>
          <div className="title"> {value.title} </div>
          <div className="body"> {value.postText} </div>
          <div className="footer"> {value.userNAme} </div>
        </div>
      );
      })} 
    </div>
  )
}

export default Home
