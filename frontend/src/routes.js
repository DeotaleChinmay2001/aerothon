/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Logout from "components/Logout/Logout";

const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },

  
  
  // {
  //   path: "/notifications",
  //   name: "Analysis",
  //   icon: "nc-icon nc-chart",
  //   component: Notifications,
  //   layout: "/admin"
  // },

  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-circle-09",
    component: Logout,
    layout: "/admin"
  },
  {
    path: "/",
    name: "Start",
    icon: "nc-icon nc-char-pie",
    component: Dashboard,
    layout: "/admin"
  },
];

export default dashboardRoutes;
