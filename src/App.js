import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import UserContext from './context/UserContext'
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner/Spinner';
import LoadingContext from './context/LoadingContext';
import { faHome, faUser, faComputer, faBook, faTentArrowTurnLeft, faCheck, faWarning, faX, faXmarkCircle, faCircleXmark, faShare, faCartShopping, faIdCard, faBookReader, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { me } from './api/auth'
import ToastContext from './context/ToastContext';
import { Toast } from 'devextreme-react/toast';
import { AxiosInterceptor } from './api/_axiosClient'
import Cookies from 'universal-cookie';
import BasicLayout from './layouts/BasicLayout/BasicLayout';

library.add(fab, faHome, faUser, faComputer, faBook, faTentArrowTurnLeft,
  faCheck, faX, faXmarkCircle, faShare, faWarning, faCartShopping, faIdCard, faBookOpenReader);

function App() {
  const cookies = new Cookies();
  if (cookies.get('cart') == null) {
    cookies.set('cart', [])
  }

  // Hooks
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    type: 'info',
    message: '',
  });
  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(false)

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
      .catch(err => console.log(err))
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

  return (
    <div className="App d-block h-100">
      <LoadingContext.Provider value={setLoading}>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContext.Provider value={{ toastConfig, setToastConfig }}>
            <AxiosInterceptor>
              <BasicLayout></BasicLayout>
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
