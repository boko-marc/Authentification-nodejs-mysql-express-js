import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ResetPassword from "./Pages/Auth/ResetPassword"
import Confirm from './Pages/Auth/ConfirmPassword';
import ChangePassword from './Pages/Auth/ChangePassword';
import WelcomeResetPassword from './Pages/Auth/WelcomeResetPassword'
function App() {
  return (
    <BrowserRouter> 
         <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Login" element={<Login />} />
         <Route path="/Confirm" element={<Confirm />} />
         <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ChangePassword/:id" element={<ChangePassword />} />
          <Route path="/Welcome" element={<WelcomeResetPassword />} />
         </Routes>
    </BrowserRouter>
  );
}

export default App;
