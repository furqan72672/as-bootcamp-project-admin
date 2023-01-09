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
import Login from "views/Login.js";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Create from "views/Create.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Appointments from "views/appointments/Appointments";
import Bookings from "views/bookings/Bookings";
import Venues from "views/venues/Venues";
import User from "views/UserProfile";
import ManageVenue from "views/venues/manageVenue";
import Offices from "views/offices/offices";
import Ratings from "views/ratings/ratings";
import ManageOffice from "views/offices/manageOffice";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: Login,
    showInSideBar: false,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-grid-45",
    component: Dashboard,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/appointments/list",
    name: "Appointments",
    icon: "nc-icon nc-money-coins",
    component: Appointments,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/bookings/list",
    name: "Bookings",
    icon: "nc-icon nc-cart-simple",
    component: Bookings,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/venues/list",
    name: "Venues",
    icon: "nc-icon nc-album-2",
    component: Venues,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/venues/manage",
    name: "Manage Venues",
    icon: "nc-icon nc-album-2",
    component: ManageVenue,
    showInSideBar: false,
    layout: "/admin"
  },
  {
    path: "/ratings/list",
    name: "Ratings",
    icon: "nc-icon nc-favourite-28",
    component: Ratings,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/offices/list",
    name: "Offices",
    icon: "nc-icon nc-bank",
    component: Offices,
    showInSideBar: true,
    layout: "/admin"
  },
  {
    path: "/offices/manage",
    name: "Manage Offices",
    icon: "nc-icon nc-favourite-28",
    component: ManageOffice,
    showInSideBar: false,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-notes",
    component: User,
    showInSideBar: false,
    layout: "/admin"
  }
];

export default dashboardRoutes;
