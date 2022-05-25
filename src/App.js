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
import GroupManage from './pages/groupManage/GroupManage';
import UserManage from './pages/userManage/UserManage';
import ToastContext from './context/ToastContext';
import { Toast } from 'devextreme-react/toast';
import { AxiosInterceptor } from './api/_axiosClient'
import SideNav from './layouts/SideNav/SideNav';

library.add(fab, faHome, faUser, faComputer, faBook, faTentArrowTurnLeft);

function App() {
  // Const
  const defauntSideBarWidth = "22%"
  const defaunContentWidth = "78%"

  // Hooks
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    type: 'info',
    message: '',
  });
  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [sideBarVisible, setSideBarVisible] = useState(true)

  useEffect(() => {
    if (user.username !== undefined) {
      return
    }
    me().then(res => {
      if (res.message === 'OK') {
        setUser(res.data)
      } else {
        setUser({})
      }
    })
  }, [])

  // Elements
  let spinnerElement;
  if (isLoading) {
    spinnerElement = (<Spinner></Spinner>)
  } else {
    spinnerElement = null
  }

  // Functions
  function onHidingToast() {
    setToastConfig({
      ...toastConfig,
      isVisible: false,
    });
  }

  function getContentWidth() {
    if (sideBarVisible) {
      return defaunContentWidth
    } else {
      return "100%"
    }
  }

  function renderSideBar() {
    if (sideBarVisible) {
      return (
        <div style={{ "width": defauntSideBarWidth }}>
          <SideNav></SideNav>
        </div>
      )
    } else {
      return (
        <div className='d-none'></div>
      )
    }
  }

  function tongleSideBar() {
    setSideBarVisible(val => !val)
  }

  return (
    <div className="App d-block h-100">
      <LoadingContext.Provider value={setLoading}>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContext.Provider value={{ toastConfig, setToastConfig }}>
            <AxiosInterceptor>
              <div style={{ "display": "flex", "flexDirection": "column", "height": "100vh" }}>
                <div style={{ "width": "100%", "height": "fit-content" }}>
                  <TopNav tongleSideBar={tongleSideBar}></TopNav>
                </div>
                <div style={{ "flexGrow": 1, "width": "100%", "display": "flex", "alignItems": "stretch" }}>
                  {renderSideBar()}
                  <div style={{ "width": getContentWidth() }}>
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/home' element={<Home />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/profile' element={<ReaderProfile />} />
                      <Route path='/groupmanage' element={<GroupManage />} />
                      <Route path='/usermanage' element={<UserManage />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </AxiosInterceptor>
          </ToastContext.Provider>
        </UserContext.Provider>
      </LoadingContext.Provider>
      {spinnerElement}
      <Toast
        visible={toastConfig.isVisible}
        message={toastConfig.message}
        type={toastConfig.type}
        onHiding={onHidingToast}
        displayTime={2000}
      />
    </div>
  );
}

export default App;
