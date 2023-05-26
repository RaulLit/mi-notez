const { NavLink } = require("react-router-dom");

const Navbar = () => {
  return (
    <div className="nav-container">
      <nav>
        <div className="logo-container">
          <NavLink to="/">
            <img src="./ieeesiesgst_logo.png" alt="" height="50px" />
          </NavLink>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="quiz">Quiz</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="register">Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
