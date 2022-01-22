import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import UserRegister from "./pages/Users/UserRegister";
// import SignUp from "./"

const routes = [
  {
    path: "/",
    layout: "landing",
    component: LandingPage,
    basePath: true,
  },
  {
    path: "/about",
    layout: "landing",
    component: LandingPage,
    basePath: true,
  },
  {
    path: "/course",
    layout: "landing",
    component: LandingPage,
    basePath: true,
  },
  {
    path: "/signup",
    layout: "auth",
    component: Signup,
    basePath: true,
  },
  {
    path: "/",
    layout: "admin",
    component: Dashboard,
    basePath: true,
  },
  {
    path: "/profile",
    layout: "admin",
    basePath: true,
    component: Profile,
  },
  {
    path: "/user/register",
    layout: "admin",
    basePath: true,
    component: UserRegister,
  },
  {
    path: "/resetpassword",
    layout: "auth",
    component: ForgotPassword,
    basePath: true,
  },
];

export default routes;
