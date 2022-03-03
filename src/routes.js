import ForgotPassword from "./pages/Auth/ForgotPassword";
import Signup from "./pages/Auth/Signup";
import CourseDetail from "./pages/Course/CourseDetail";
import CourseEnrollment from "./pages/Course/CourseEnrollment";
import CourseList from "./pages/Course/CourseList";
import CoursePorposeList from "./pages/Course/CoursePorposeList";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";
import FormMasterStudies from "./pages/Masterdata/Form/FormMasterStudies";
import MasterFaculty from "./pages/Masterdata/MasterFaculty";
import MasterStudies from "./pages/Masterdata/MasterStudies";
import Profile from "./pages/Profile";
import AddAssignment from "./pages/Study/Assignment/AddAssignment";
import { Questions } from "./pages/Study/Assignment/Questions";
import CourseSections from "./pages/Study/Course/CourseSections";
import SetupCourses from "./pages/Study/Course/SetupCourses";
import MyStudies from "./pages/Study/MyStudies";
import StudyJoin from "./pages/Study/StudyJoin";
import ManageUser from "./pages/Users/ManageUser";
import UserRegister from "./pages/Users/UserRegister";

import Course from "./pages/Landing/Course";
import MyCourseList from "./pages/MyCourse/MyCourseList";
import CourseLearning from "./pages/MyCourse/CourseLearning";
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
  //routing student
  {
    path: "mycourse",
    layout: "admin",
    basePath: true,
    component: MyCourseList,
  },
  {
    path: "mycourse/:id/:ch",
    layout: "admin",
    basePath: true,
    component: CourseLearning,
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
    path: "user/list",
    layout: "admin",
    basePath: true,
    component: ManageUser,
  },
  {
    path: "Faculty",
    layout: "admin",
    component: MasterFaculty,
  },
  {
    path: "studies",
    layout: "admin",
    basePath: true,
    component: MasterStudies,
  },
  {
    path: "study-join",
    layout: "admin",
    basePath: true,
    component: StudyJoin,
  },
  {
    path: "master/setstudy/add",
    layout: "admin",
    parent: "/master/setstudy",
    basePath: false,
    component: FormMasterStudies,
  },
  {
    path: "course/enroll",
    layout: "admin",
    component: CourseEnrollment,
  },
  {
    path: "course/list",
    layout: "admin",
    basePath: true,
    component: CourseList,
  },
  {
    path: "course/detail/:id",
    layout: "admin",
    component: CourseDetail,
  },
  // {
  //   path: "course/:id",
  //   layout: "admin",
  //   component: CourseDetail,
  // },
  {
    path: "course/setup",
    layout: "admin",
    basePath: true,
    component: MyStudies,
  },
  {
    path: "course/propose",
    layout: "admin",
    basePath: true,
    component: CoursePorposeList,
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
