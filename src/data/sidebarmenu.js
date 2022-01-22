import {
  Comment as CommentIcon,
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  DataSaverOff,
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
        title: "User Register",
        path: "/user/register",
      },
      {
        title: "Manage User",
        path: "/user/manage",
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
        title: "List Registrant",
        path: "/study/registrant",
      },
    ],
  },
  {
    title: "Dsicussion",
    path: "#",
    icon: <CommentIcon />,
  },
  
];
