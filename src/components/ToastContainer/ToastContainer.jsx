import React from "react";
import ReactDOM from "react-dom";
import { Toast } from "devextreme-react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "../../store/reducer/toast/toastActionTypes";

function ToastContent() {
  const dispatch = useDispatch();
  const { isVisible, type, message } = useSelector((state) => state.toast);

  const onHidden = () => {
    dispatch({
      type: END,
    });
  };

  return (
    <div>
      <Toast
        visible={isVisible}
        message={message}
        type={type}
        displayTime={5000}
        onHidden={onHidden}
      />
    </div>
  );
}

export default function ToastContainer() {
  return ReactDOM.createPortal(
    <ToastContent />,
    document.getElementById("root-toaster")
  );
}
