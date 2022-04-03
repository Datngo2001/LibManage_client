import './App.css';
import TopNav from './layouts/TopNav/TopNav'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home/home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import UserContext from './context/UserContext'
import { useEffect, useMemo, useState } from 'react';
import Spinner from './components/Spinner/Spinner';
import LoadingContext from './context/LoadingContext';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

function App() {

  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    debugger
    if (user.username !== undefined) {
      return
    }
    const token = Cookies.get('Authorization')
    if (!token) {
      return
    }
    const userdata = jwt(token)
    setUser({
      id: userdata.id,
      username: userdata.username,
      role: userdata.role
    })
  }, [])

  var spinnerElement;
  if (isLoading) {
    spinnerElement = (<Spinner></Spinner>)
  } else {
    spinnerElement = null
  }

  return (
    <div className="App d-block">
      <LoadingContext.Provider value={setLoading}>
        <UserContext.Provider value={{ user, setUser }}>
          <TopNav></TopNav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </UserContext.Provider>
      </LoadingContext.Provider>
      {spinnerElement}
    </div>
  );
}

export default App;
