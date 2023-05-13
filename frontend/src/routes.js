import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
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
