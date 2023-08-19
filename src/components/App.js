import { useEffect } from "react";
import {getPosts} from "../api/index";
function App() {
  useEffect(() =>{

    const fetchPosts = async () =>{
      const response = await getPosts();
      console.log('response',response);
    }
    fetchPosts();
  },[]);
  return (
    <div className="App">
     codeial
    </div>
  );
}

export default App;
