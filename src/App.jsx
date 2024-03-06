import './App.css'
import {Routes, Route} from "react-router-dom";

import SignupPage from './pages/SignupPage';


function App() {
 

  return (
    <>
     <h1>Our Project</h1>

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
