import React from 'react';
import { useParams } from 'react-router-dom';

 

function Post() {
    let { id } = useParams();  //now the program knows what to get as useParams
  return (
    <div>
        {id}      
    </div>
  )
}

export default Post
