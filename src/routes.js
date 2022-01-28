import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
import FormMasterStudies from "./pages/Masterdata/Form/FormMasterStudies";
import MasterStudies from "./pages/Masterdata/MasterStudies";
import MasterTopic from "./pages/Masterdata/MasterTopics";
import Profile from "./pages/Profile";
import SetupCourses from "./pages/Study/Course/SetupCourses";
import CourseSections from "./pages/Study/Course/CourseSections";
import MyStudies from "./pages/Study/MyStudies";
import UserEnroll from "./pages/Study/UserEnroll";
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
    path: "/master/settopic",
    layout: "admin",
    basePath: true,
    component: MasterTopic,
  },
  {
    path: "/master/setstudy",
    layout: "admin",
    basePath: true,
    component: MasterStudies
  },
  {
    path: "/master/setstudy/add",
    layout: "admin",
    component: FormMasterStudies
  },
  {
    path : "/study/enroll",
    layout : "admin",
    basePath : true,
    component : UserEnroll
  },
  {
    path : "/mystudies/setup",
    layout : "admin",
    basePath : true,
    component : MyStudies
  },
  {
    path : "/mystudies/setup/sections/:studyid",
    layout : "admin",
    component : CourseSections
  },
  {
    path : "/mystudies/setup/course/:sectionId",
    layout : "admin",
    component : SetupCourses
  },
  {
    path: "/resetpassword",
    layout: "auth",
    component: ForgotPassword,
    basePath: true,
  },
];

export default routes;
