import React from 'react';
import { useEffect, useState } from "react" //useEffect will allow to run a function immediately when 

import { useParams } from 'react-router-dom';
import axios from 'axios';


 

function Post() {

    let { id } = useParams();  //now the program knows what to get as useParams
    const [postObject, setPostObject] = useState({}) 
    
    
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
            setPostObject(response.data)       
            
        }) 
    
      }, []);
      
  return (
    <div className="postPage" >
        <div className="leftSide">
            <div className="post" id="individual">
                <div className="title">{postObject.title}</div>
                <div className="body">{postObject.postText}</div>
                <div className="footer">{postObject.userNAme}</div>
            </div>
       </div>
       <div className="rightSide">Comment Section</div>
    </div>
  )
}

export default Post
