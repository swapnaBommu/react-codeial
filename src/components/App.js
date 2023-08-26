
import {Home,Login,Signup,Settings} from "../pages";
import {Loader, Navbar} from "./";
import {Routes,Route} from'react-router-dom';
import { useAuth } from '../hooks';

const Page404 =() =>{
  return <h1>404</h1>;
}

function App() {
  const auth = useAuth();

  if(auth.loading){
    return <Loader/>
  }
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Signup />}></Route>
          <Route exact path="/settings" element={<Settings />}></Route>
          <Route element={<Page404 />}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
