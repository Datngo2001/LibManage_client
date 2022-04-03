import './App.css';
import TopNav from './layouts/TopNav/TopNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'

function App() {
  return (
    <div className="App d-block">
      <TopNav></TopNav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
