import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner/Spinner';
import LoadingContext from './context/LoadingContext';
import { faHome, faUser, faComputer, faBook, faTentArrowTurnLeft, faCheck, faWarning, faX, faXmarkCircle, faCircleXmark, faShare, faCartShopping, faIdCard, faBookReader, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import ToastContext from './context/ToastContext';
import { Toast } from 'devextreme-react/toast';
import { AxiosInterceptor } from './api/_axiosClient'
import Cookies from 'universal-cookie';
import BasicLayout from './layouts/BasicLayout/BasicLayout';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_REQUEST, SIGNIN_REQUEST } from "./store/reducer/user/userActionTypes"

library.add(fab, faHome, faUser, faComputer, faBook, faTentArrowTurnLeft,
  faCheck, faX, faXmarkCircle, faShare, faWarning, faCartShopping, faIdCard, faBookOpenReader);

function App() {
  const cookies = new Cookies();
  if (cookies.get('cart') == null) {
    cookies.set('cart', [])
  }

  // Hooks
  const dispatch = useDispatch()
  const [toastConfig, setToastConfig] = useState({
    isVisible: false,
    type: 'info',
    message: '',
  });
  const { user } = useSelector(state => state.user)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (user != null) {
      return
    }
    dispatch({ type: CHECK_REQUEST })
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
        <ToastContext.Provider value={{ toastConfig, setToastConfig }}>
          <AxiosInterceptor>
            <BasicLayout></BasicLayout>
          </AxiosInterceptor>
        </ToastContext.Provider>
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
