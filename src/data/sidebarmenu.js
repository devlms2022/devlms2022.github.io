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
        title: "Setup Topic",
        path: "/master/settopic",
      },
      {
        title: "Setup Study",
        path: "/master/setstudy",
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
        path: "/user/active",
      },
      {
        title: "User Register",
        path: "/user/register",
      },
    ],
  },
  {
    title: "Studies",
    path: "#",
    icon: <SchoolIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "User Enroll",
        path: "/study/enroll",
      },
    ],
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
    title: "My Studies",
    path: "#",
    icon: <FeedIcon />,
    iconClosed: <KeyboardArrowDown />,
    iconOpened: <KeyboardArrowUp />,
    subNav: [
      {
        title: "Setup Course",
        path: "/mystudies/setup",
      },
      {
        title: "List Studies",
        path: "/studies/list",
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
