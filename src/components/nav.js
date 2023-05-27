import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="nav-container">
      <div className="logo-container">
        <NavLink to="/">
          <img src="./no-bg-logo.png" alt="" height="50px" />
        </NavLink>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        {!auth.currentUser && (
          <li className="nav-item">
            <NavLink to="auth">Register</NavLink>
          </li>
        )}
        {!auth.currentUser && (
          <li className="nav-item">
            <button onClick={logout} className="btn">
              Log out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
