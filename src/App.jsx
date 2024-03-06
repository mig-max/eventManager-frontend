import './App.css'
import {Routes, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';

function App() {
 

  return (
    <>
     <h1>Our Project</h1>
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
     </Routes>
    </>
  )
}

export default App
