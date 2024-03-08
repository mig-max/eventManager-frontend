/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Send the requestBody object to the backend
    const requestBody = {
      email: email,
      password: password,
      name: name,
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
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          placeholder="your@email.com"
          value={email} 
          onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="******"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Your name"
          value={name} 
          onChange={handleName} />

        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        {error && <p>{error}</p>}

        <p>
          Already have account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
