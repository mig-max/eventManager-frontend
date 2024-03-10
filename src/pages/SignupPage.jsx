/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import { Input, Button } from 'react-daisyui';

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
      username: username, // Add username field to the requestBody
      avatar: avatar, // Add avatar field to the requestBody
      about: about, // Add about field to the requestBody
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
    <div className="SignUpPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
    <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

    <form onSubmit={handleSignupSubmit}>
        <Input
            type="text"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmail}
            label="Email:"
            icon="bx bx-envelope"
        />

        <Input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handlePassword}
            label="Password:"
            icon="bx bx-lock"
        />

        <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={handleName}
            label="Name:"
            icon="bx bx-user"
        />

        <Input
            type="text"
            name="username"
            placeholder="Your username"
            value={username}
            onChange={handleUsername}
            label="Username:"
            icon="bx bx-user"
        />

        <Input
            type="text"
            name="avatar"
            placeholder="Your avatar"
            value={avatar}
            onChange={handleAvatar}
            label="Avatar:"
            icon="bx bx-image"
        />

        <Input
            type="text"
            name="about"
            placeholder="About you"
            value={about}
            onChange={handleAbout}
            label="About:"
            icon="bx bx-info-circle"
        />

        <Button type="submit" className="btn mt-4" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-active btn-secondary">
            Login
        </Link>
    </form>
</div>
  );
}

export default SignupPage;
