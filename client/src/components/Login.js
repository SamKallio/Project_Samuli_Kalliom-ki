import { useState } from "react";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

//Login component. This handles logging in communication with the backend.

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Upon submitting the form this attempts to login using the route provided
  //If successful, user can start posting posts, comments and likes
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          //Store token into browser local storage
          storeToken(data.token);
          navigate("/");
        } else {
          return <Error data={data} />;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="align-center">
      <br></br>
      <h5>Login Page</h5>
      <br></br>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label htmlFor="Email">Email</label>
        <br></br>
        <input
          style={{ width: "40%", margin: "auto" }}
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          value={userData.email}
        ></input>
        <br></br>
        <label htmlFor="Password">Password</label>
        <br></br>
        <input
          style={{ width: "40%", margin: "auto" }}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={userData.password}
        ></input>
        <br></br>
        <br></br>

        <button
          className="blue lighten-1 waves-effect waves-light btn"
          type="submit"
          id="login"
        >
          Login
        </button>
      </form>
    </div>
  );
};
//Stores token into localstorage
function storeToken(token) {
  localStorage.setItem("auth_token", token);
}

export default Login;
