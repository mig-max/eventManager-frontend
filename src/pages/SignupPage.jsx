/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { Input, Button } from 'react-daisyui';
import { FaEnvelope, FaLock, FaUserCircle, FaInfoCircle, FaUser, FaImage } from 'react-icons/fa';


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [waitingForFileUrl, setWaitingForFileUrl] = useState(false);


  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    setWaitingForFileUrl(true);
    console.log("file to upload:", event.target.file);

    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);

    userService
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response);
        setFileUrl(response.data.fileUrl);

        setAvatar(response.data.fileUrl); 
        setWaitingForFileUrl(false);
      })
      .catch((error) => console.log(error));
  };


  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

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
      fileUrl: avatar //
    };

    authService
      .signup(requestBody) 
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
    <h1 className="text-2xl font-bold mb-7">Sign Up</h1>

    <form onSubmit={handleSignupSubmit}>
      <div className="flex items-center mb-4">
        <span className="mr-2">
      <FaEnvelope />
      </span>
        <Input
            type="text"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmail}
            label="Email:"
            icon="bx bx-envelope"
        />
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaLock/>
          </span>
        <Input
            type="password"
            name="password"
            placeholder="******"
            value={password}
            onChange={handlePassword}
            label="Password:"
            icon="bx bx-lock"
        />
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaUserCircle/>
          </span>
        <Input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={handleName}
            label="Name:"
            icon="bx bx-user"
        />
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaInfoCircle/>
          </span>
        <Input
            type="text"
            name="about"
            placeholder="About you"
            value={about}
            onChange={handleAbout}
            label="About:"
            icon="bx bx-info-circle"
          />
          <span className="badge-outline badge-primary">&nbsp;Optional</span>
          </div>

          <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaUser/>
          </span>
        <Input
            type="text"
            name="username"
            placeholder="Your username"
            value={username}
            onChange={handleUsername}
            label="Username:"
            icon="bx bx-user"
        />
        <span className="badge-outline badge-primary">&nbsp;Optional</span>
        </div>

        <div className="flex items-center mb-4">
        <span className="mr-2">
          <FaImage/>
          </span>
        <Input
            type="text"
            name="avatar"
            placeholder="Your avatar Url"
            value={avatar}
            onChange={handleAvatar}
            label="Avatar:"
            icon="bx bx-image"
        />
        <span className="badge-outline badge-primary">&nbsp;Optional</span>
        </div>


            <Input
              type="file"
              name="fileUrl"
              placeholder="Or image from file"
              onChange={(event) => handleFileUpload(event)}
            />

        <div className="mb-2">
        <Button type="submit" className="btn mt-4" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <div className="mb-2">
        <p>Already have an account?</p>
        </div>
        <Link to="/login" className="btn btn-active btn-secondary">
            Login
        </Link>
    </form>
</div>
  );
}

export default SignupPage;
