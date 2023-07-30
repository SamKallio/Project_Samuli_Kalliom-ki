import "./App.css";
import "materialize-css/dist/css/materialize.min.css"; //Materialize css
import "materialize-css/dist/js/materialize.min.js"; //Materialize css

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";

//Components list
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Post from "./components/Post";
import UndefinedURL from "./components/UndefinedURL";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Front from "./components/Front";
import CodeSnippet from "./components/CodeSnippet";

function App() {
  //For checking token!
  const [isToken] = useState(localStorage.getItem("auth_token"));

  //This is app component which holds all the routing
  //Coolest one for me is the /user/posts/newpost, which will direct the user to different URL if token is not found
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Front />}></Route>
          <Route path="/user/posts/:id" element={<Post />}></Route>
          <Route path="/user/posts" element={<Posts />}></Route>
          <Route
            path="/user/posts/newpost"
            element={isToken ? <CodeSnippet /> : <Navigate replace to={"/"} />}
          ></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/user/register" element={<Register />}></Route>
          <Route path="*" element={<UndefinedURL />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
