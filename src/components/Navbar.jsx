import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleUserDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
            isUserDropdownOpen ? "block" : "hidden"
          }`}> 
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/user">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/venues">Venues</Link>
                </li>
                <li>
                  <Link to="/events/free">Free Events</Link>
                </li>
                <li>
                  <Link to="/events/add">Add Events</Link>
                </li>
                <li>
                  <Link to="/venues/add">Add Venues</Link>
                </li>
              </>
            )}
          </ul> 
        </div>
        <Link to="/">
          <a className="btn btn-ghost text-xl">EventSlap</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/user">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <>
                {isLoggedIn && (
                  <li>
                    <details>
                      <summary>Add</summary>
                      <ul className="p-2">
                        <li>
                          <Link to="/events/add">Events</Link>
                        </li>
                        <li>
                          <Link to="/venues/add">Venues</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                )}
              </>
            </>
          )}
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/venues">Venues</Link>
          </li>
          <li>
            <Link to="/events/free">Free</Link>
          </li>
        </ul>
      </div>
      <Link to="/find" className="btn">
        Find Events
      </Link>
      <div className="navbar-end">
        <label className="flex cursor-pointer gap-2">
          <input
            type="checkbox"
            value="acid"
            className="toggle theme-controller"
          />
        </label>
      </div>
    </div>
  );
}

export default Navbar;
