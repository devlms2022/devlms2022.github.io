import LandingPage from "./pages/Landing";
import Login from "./pages/Auth/Login";

const routes = [
    {
        path : "/",
        layout : "app",
        component : LandingPage,
        basePath: true
    },
    {
        path : "/signin",
        layout : "auth",
        component : Login,
        basePath: true
    },
    {
        path : "/about",
        layout : "app",
        component : LandingPage,
        basePath: true
    },
    {
        path : "/course",
        layout : "app",
        component : LandingPage,
        basePath: true
    },
    {
        path : "/signup",
        layout : "auth",
        component : LandingPage,
        basePath: true
    }
];

export default routes;