import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";


import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from "react";
import axios from "axios";


function App() {

  const [authState, setAuthState] = useState({ userName: "", id: 0, status: false });

  useEffect(() => {        //we have to rerender the page at first as authState is false by default
    axios.get("http://localhost:3001/auth/auth", {
      headers: { //as on the server side we use validateToken middleware we need send this info in the headers 
        accessToken: localStorage.getItem("accessTokenn"),
      },
    })
      .then((response) => { //we add this end point to the server to check and avoid fake data of the accessTokent in the localStorage
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({ userName: response.data.userName, id: response.data.id, status: true });
        }
      });

  }, []);

  const logout = () => {
    localStorage.removeItem("accessTokenn") //we removed the Tokent> BUT!!!! it will not show any chages in our navbar: logout button will not be replaced with the Login/registration => we need change our state:
    setAuthState({ userName: "", id: 0, status: false }) //it will rerender the page
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/createpost">Create A Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.userName}</h1>
              {authState.status && <button onClick={logout}> Logout </button>}
            </div>
          </div>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/changepassword" exact element={<ChangePassword />} />


            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
