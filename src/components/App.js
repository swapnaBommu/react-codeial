import { useEffect, useState } from "react";
import {getPosts} from "../api/index";
import Loader from "./Loader";
import {Home,Login} from "../pages/index";
import Navbar from "./Navbar";
import {Routes,Route} from'react-router-dom';

const About =() =>{
  return <h1>About</h1>;
}
const UserInfo = () => {
  return <h1>user info</h1>;
}
function App() {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  // useEffect(() =>{

  //   const fetchPosts = async () =>{
  //     const response = await getPosts();
  //     console.log('response',response);
  //     if(response.success){
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   }
  //   fetchPosts();
  // },[]);

  if(loading){
    return <Loader/>
  }
  return (
    <div className="App">
      <Navbar/>
      
        <Routes>
          <Route exact path='/' element={<Home posts={[]} />}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/info" element={<UserInfo/>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
