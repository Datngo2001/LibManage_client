import React from "react";
import { useState } from "react";
import styles from "./basicLayout.module.css";
import TopNav from "../TopNav/TopNav";
import AppRoutes from "../../routes/AppRoutes";
import SideNav from "../SideNav/SideNav";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

function BasicLayout() {
  const [sideBarVisible, setSideBarVisible] = useState(true);
  const { user } = useSelector((state) => state.user);

  function tongleSideBar() {
    setSideBarVisible((val) => !val);
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["header-container"]}>
        <TopNav tongleSideBar={tongleSideBar}></TopNav>
      </div>
      <div className={styles["body-container"]}>
        {sideBarVisible ? (
          <div className={styles["sidenav-container"]}>
            <SideNav userPermissions={user?.permissionCodes}></SideNav>
          </div>
        ) : null}
        <div className={styles["route-container"]}>
          <AppRoutes permissions={user?.permissionCodes}></AppRoutes>
        </div>
      </div>
      <div className={styles["footer-container"]}>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default BasicLayout;
