/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //extra fields
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [about, setAbout] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  //extra fields
  const handleUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleAvatar = (event) => {
    setAvatar(event.target.value);
  }
  const handleAbout = (event) => {
    setAbout(event.target.value);
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Send the requestBody object to the backend
    const requestBody = {
      email: email,
      password: password,
      name: name,
      username: username,
      avatar: avatar,
      about: about,
    };

    authService
      .signup(requestBody) // Pass the requestBody object
      .then((response) => {
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="SignUpPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label className="input input-bordered flex items-center gap-2">
        Email:
        <input 
          type="text" 
          name="email" 
          placeholder="your@email.com"
          value={email} 
          onChange={handleEmail} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
          </label>


        <label className="input input-bordered flex items-center gap-2"  >
        Password:
        <input
          type="password"
          name="password"
          placeholder="******"
          value={password}
          onChange={handlePassword}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        </label>


        <label className="input input-bordered flex items-center gap-">
        Name:
        <input 
          type="text" 
          name="name" 
          placeholder="Your name"
          value={name} 
          onChange={handleName} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          </label>

          <label className="input input-bordered flex items-center gap-">
        Username:
        <input 
          type="text" 
          name="username" 
          placeholder="Your username"
          value={username} 
          onChange={handleUsername} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          </label>

          <label className="input input-bordered flex items-center gap-">
        Avatar:
        <input 
          type="text" 
          name="avatar" 
          placeholder="Your avatar"
          value={avatar} 
          onChange={handleAvatar} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          </label>

          <label className="input input-bordered flex items-center gap-">
        About:
        <input 
          type="text" 
          name="about" 
          placeholder="About you"
          value={about} 
          onChange={handleAbout} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          </label>

        <button className="btn btn-active btn-primary" type="submit" disabled={loading}>
          Sign Up
        </button>
        {error && <p>{error}</p>}

        <p>  Already have account? </p>
        
          <Link className="btn btn-active btn-secondary" to="/login">Login</Link>
       
      </form>
    </div>
  );
}

export default SignupPage;




 
