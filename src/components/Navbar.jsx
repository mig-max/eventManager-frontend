import {Link} from "react-router-dom"
//import { useContext } from "react";
//import { AuthContext } from "../context/auth.context";


function Navbar() {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>My Slaps:</a>
          <ul className="p-2">
            <li><a>Posted</a></li>
            <li><a>Wishes</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <Link to="/"> 
    <a className="btn btn-ghost text-xl">EventSlap</a>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <Link to="/login"> 
      <li><a>Login</a></li>
      </Link>
      <Link to="/signup"> 
      <li><a>Sign Up</a></li>
      </Link>
      <li>
        <details>
          <summary>My Events</summary>
          <ul className="p-2">
            <li><a>Posted</a></li>
            <li><a>Wishes</a></li>
          </ul>
        </details>
      </li>
      <Link to="/events"> 
      <li><a>Events</a></li>
      </Link>
      <Link to="/venues"> 
      <li><a>Venues</a></li>
      </Link>
      <li><a>Free Events</a></li>
      <li>
        <details>
          <summary>Add</summary>
          <ul className="p-2">
          <Link to="/events/add"> 
            <li><a>Events</a></li>
            </Link>
            <Link to="/venues/add"> 
            <li><a>Venues</a></li>
            </Link>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Find Events</a>
  </div>
</div>

  )
}

export default Navbar;
