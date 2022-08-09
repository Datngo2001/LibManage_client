import React from "react";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from "./basicLayout.module.css";
import TopNav from "../TopNav/TopNav";
import AppRoutes from "../../routes/AppRoutes";
import SideNav from "../SideNav/SideNav";

function BasicLayout() {
  // Const
  const defauntSideBarWidth = "22%";
  const defaunContentWidth = "78%";
  const [sideBarVisible, setSideBarVisible] = useState(true);
  const { user } = useContext(UserContext);

  function getContentWidth() {
    if (sideBarVisible && user.username !== undefined) {
      return defaunContentWidth;
    } else {
      return "100%";
    }
  }

  function tongleSideBar() {
    setSideBarVisible((val) => !val);
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["topnav-container"]}>
        <TopNav tongleSideBar={tongleSideBar}></TopNav>
      </div>
      <div className={styles["sidenav-container"]}>
        {sideBarVisible ? (
          <SideNav userPermissions={user?.permissionCodes}></SideNav>
        ) : null}
      </div>
      <div className={styles["content-container"]}>
        <AppRoutes permissions={user.permissionCodes}></AppRoutes>
      </div>
    </div>
  );
}

export default BasicLayout;
