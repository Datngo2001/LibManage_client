import React from "react";
import GroupManage from "../pages/groupManage/GroupManage";
import UserManage from "../pages/userManage/UserManage";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ReaderProfile from "../pages/readerProfile/readerProfile";
import BrowsingBooks from "../pages/BrowsingBooks/BrowsingBooks";

function AppRoutes(prop) {
  // Const
  const routeAndPermission = [
    {
      pers: [],
      route: <Route key={1} path="/profile" element={<ReaderProfile />} />,
    },
    {
      pers: [1, 2, 3, 4],
      route: <Route key={2} path="/groupmanage" element={<GroupManage />} />,
    },
    {
      pers: [1, 2, 3, 4],
      route: <Route key={3} path="/usermanage" element={<UserManage />} />,
    },
    {
      pers: [],
      route: <Route key={3} path="/books" element={<BrowsingBooks />} />,
    },
  ];

  //Fuction
  function renderRestrictedRoutes() {
    if (!prop.permissions) {
      return <></>;
    }

    let allowedRoutes = [];
    routeAndPermission.forEach((r) => {
      if (r.pers.some((p) => prop.permissions.includes(p))) {
        allowedRoutes.push(r.route);
      } else if (r.pers.length == 0) {
        allowedRoutes.push(r.route);
      }
    });

    return <>{allowedRoutes}</>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {renderRestrictedRoutes()}
    </Routes>
  );
}

export default AppRoutes;
