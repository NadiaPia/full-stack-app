import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Profile() {
    let { id } = useParams();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`). then((response) => {
            setUserName(response.data.userNAme)

        })
    }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo"><h1>Username: {userName}</h1></div>
      <div className="listOfPosts"></div>

    </div>
  )
}

export default Profile
