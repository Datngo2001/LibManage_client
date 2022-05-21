import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import TopNav from './layouts/TopNav/TopNav'
import { Route, Routes } from "react-router-dom";
import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'
import ReaderProfile from './pages/readerProfile/readerProfile'
import UserContext from './context/UserContext'
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner/Spinner';
import LoadingContext from './context/LoadingContext';
import { faHome, faUser, faComputer, faBook, faTentArrowTurnLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { me } from './api/auth'


library.add(fab, faHome, faUser, faComputer, faBook, faTentArrowTurnLeft);

function App() {

  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (user.username !== undefined) {
      return
    }
    me().then(res => {
      debugger
      if (res.message === 'OK') {
        setUser(res.data)
      } else {
        setUser({})
      }
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
            <Route path='/profile' element={<ReaderProfile />} />
          </Routes>
        </UserContext.Provider>
      </LoadingContext.Provider>
      {spinnerElement}
    </div>
  );
}

export default App;
