import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Login() {

    let navigate = useNavigate();


    const [username, setUserName] = useState("");
    const [password, setPasswordName] = useState("");


    const login = () => {
        const data = {userNAme: username, password: password} //as we dont't use Formik here, we can create "data" by ourown
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            //console.log(response.data)
            if(response.data.error) {
              alert(response.data.error) //if res.json from the server contains error message              
            } else {
              sessionStorage.setItem("accessTokenn", response.data ) //look at inspect -> Application -> session storage
              navigate("/")
            } 
        })
    }
  return (
    <div className="loginContainer">
      <input type="text" placeholder="Username..." onChange={(event) => {setUserName(event.target.value)}}/>   
      <input type="password" placeholder="Password..." onChange={(event) => {setPasswordName(event.target.value)}}/>

      <button onClick={login}>Login</button>

    </div>
  )
}

export default Login;
