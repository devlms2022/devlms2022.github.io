import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
import FormMasterStudies from "./pages/Masterdata/Form/FormMasterStudies";
import MasterStudies from "./pages/Masterdata/MasterStudies";
import MasterTopic from "./pages/Masterdata/MasterTopics";
import Profile from "./pages/Profile";
import AddAssignment from "./pages/Study/Assignment/AddAssignment";
import { Questions } from "./pages/Study/Assignment/Questions";
import CourseSections from "./pages/Study/Course/CourseSections";
import SetupCourses from "./pages/Study/Course/SetupCourses";
import ListStudies from "./pages/Study/ListStudies";
import MyStudies from "./pages/Study/MyStudies";
import UserEnroll from "./pages/Study/UserEnroll";
import UserRegister from "./pages/Users/UserRegister";

import Course from "./pages/Landing/Course";
// import SignUp from "./"

const routes = [
  {
    path: "/",
    layout: "landing",
    basePath: true,
    component: LandingPage,
  },
  {
    path: "/about",
    layout: "landing",
    component: LandingPage,
  },
  {
    path: "/course",
    layout: "landing",
    component: Course,
    basePath: true,
  },
  {
    path: "/signup",
    layout: "auth",
    component: Signup,
  },
  {
    path: "/",
    basePath: true,
    layout: "admin",
    component: Dashboard,
  },
  {
    path: "/profile",
    layout: "admin",
    component: Profile,
  },
  {
    path: "user/register",
    layout: "admin",
    basePath: true,
    component: UserRegister,
  },
  {
    path: "master/settopic",
    layout: "admin",

    component: MasterTopic,
  },
  {
    path: "master/setstudy",
    layout: "admin",
    basePath: true,
    component: MasterStudies,
  },
  {
    path: "master/setstudy/add",
    layout: "admin",
    parent: "/master/setstudy",
    basePath: false,
    component: FormMasterStudies,
  },
  {
    path: "study/enroll",
    layout: "admin",
    component: UserEnroll,
  },
  {
    path: "studies/list",
    layout: "admin",
    component: ListStudies,
  },
  {
    path: "mystudies/setup",
    layout: "admin",
    basePath: true,
    component: MyStudies,
  },
  {
    path: "mystudies/setup/sections/:studyid",
    layout: "admin",
    parent: "/mystudies/setup",
    component: CourseSections,
  },
  {
    path: "mystudies/setup/course/:sectionId",
    layout: "admin",
    parent: "/mystudies/setup",
    component: SetupCourses,
  },
  {
    path: "mystudies/setup/addassignment/:sectionId",
    layout: "admin",
    parent: "/mystudies/setup",
    component: AddAssignment,
  },
  {
    path: "mystudies/setup/assignment/questions/:assignmentId",
    layout: "admin",
    parent: "/mystudies/setup",
    component: Questions,
  },
  {
    path: "resetpassword",
    layout: "auth",
    component: ForgotPassword,
  },
];

export default routes;
