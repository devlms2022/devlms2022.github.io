import {
  Comment as CommentIcon,
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  DataSaverOff,
  Report,
  KeyboardArrowUp,
  KeyboardArrowDown,
  School,
  LocalLibrary,
  GroupAdd,
} from "@mui/icons-material";

export const Menuadmin = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
  },
  {
    title: "Master Data",
    path: "#",
    icon: <FeedIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "Faculty",
        path: "/faculty",
      },
      {
        title: "Studies",
        path: "/studies",
      },
    ],
  },
  {
    title: "Users",
    path: "#",
    icon: <GroupIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "User Active",
        path: "/user/list",
      },
      {
        title: "User Register",
        path: "/user/register",
      },
    ],
  },
  {
    title: "Course",
    path: "#",
    icon: <SchoolIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "Course List",
        path: "/course/list",
      },
      {
        title: "Course Enrollment",
        path: "/course/enroll",
      },
      {
        title: "Course Propose",
        path: "/course/propose",
      },
    ],
  },
  {
    title: "Study Join",
    path: "/study-join",
    icon: <GroupAdd />,
  },
  {
    title: "Dsicussion",
    path: "#",
    icon: <CommentIcon />,
  },
];

export const MenuTeacher = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Studies",
    path: "/studies",
    icon: <LocalLibrary />,
  },
  {
    title: "Course",
    path: "#",
    icon: <School />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "Set Course",
        path: "/course/setup",
      },
      {
        title: "My Course",
        path: "/course/list",
      },
    ],
  },
  {
    title: "Discussion",
    path: "/discussion",
    icon: <GroupIcon />,
  },
  {
    title: "Report",
    path: "/report",
    icon: <Report />,
  },
];

export const MenuStudent = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "My Course",
    path: "/mycourse",
    icon: <LocalLibrary />,

  },

];
