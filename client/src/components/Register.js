import { useState } from "react";
import { useNavigate } from "react-router-dom";

//This component handles user registeration and provides the required input fields to send data to backend

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(userData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data === "Register OK!") {
          navigate("/user/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <br></br>
      <h5>Register</h5>
      <br></br>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label htmlFor="Username">Username</label>
        <br></br>
        <input
          style={{ width: "40%", margin: "auto" }}
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={userData.username}
        ></input>
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
          id="register"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
