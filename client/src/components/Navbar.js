import { FaRocketchat } from "react-icons/fa";

//This is my NavBar component, it uses Materialize and has mostly links and stylings
//NavBar has the links to navigate on the site and also logout (which deletes auth_token from the localStorage)

const Navbar = () => {
  const LogOut = () => {
    localStorage.removeItem("auth_token");
  };

  return (
    <nav className="blue lighten-1">
      <div className="nav-wrapper">
        <h6 className="center-align brand-logo hide-on-med-and-down">
          Code Board
          <FaRocketchat style={{ marginLeft: "15px", fontSize: "30px" }} />
        </h6>
        <ul id="nav-mobile" className="left-align right hide-on-med-and-dow">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/user/posts">Posts</a>
          </li>
          <li>
            <a href="/user/login">Login</a>
          </li>
          <li>
            <a onClick={LogOut} href="/user/login">
              Logout
            </a>
          </li>
          <li>
            <a href="/user/register">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
