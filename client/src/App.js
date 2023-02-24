import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from "react";



function App() {

  const [authState, setAuthState] = useState(false);

  useEffect(() => {                                //we have to rerender the page at first as authState is false by default
    if(localStorage.getItem("accessTokenn")) {
      setAuthState(true);
    }

  }, [])
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <div className="navbar">
        <Link to="/createpost">Create A Post</Link>
        <Link to="/">Home Page</Link>
        {!authState && (
        <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        </>
        )
        }
        
      </div>

      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/createpost" exact element={<CreatePost/>}/>
        <Route path="/post/:id" exact element={<Post/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/registration" exact element={<Registration/>}/>


      </Routes>

    </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
