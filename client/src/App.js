import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react" //useEffect will allow to run a function immediately when 
                                //the page reranders (when we open a webpage we can see all posps right away in it)

function App() {

  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data)
    }) 

  }, [])

  return (
    <div className="App"> {listOfPosts.map((value, key) => {
      return (
        <div className="post">
          <div className="title"> {value.title} </div>
          <div className="body"> {value.postText} </div>
          <div className="footer"> {value.userNAme} </div>
        </div>
      );
      })} 
    </div>
  );
}

export default App;
