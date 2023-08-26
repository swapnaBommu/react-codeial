
import {Home,Login,Signup,Settings,UserProfile} from "../pages";
import {Loader, Navbar} from "./";
import {Routes,Route} from'react-router-dom';
import { useAuth } from '../hooks';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,...rest }) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

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
          <Route
            path="/settings"
            element={
              <ProtectedRoute >
                <Settings />
              </ProtectedRoute>
            }
          />
           <Route
            path="/user/:userId"
            element={
              <ProtectedRoute >
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route element={<Page404 />}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
