import React from "react";
import Splash from "../components/global/splash";
import { AuthContext } from "../contexts/authContext";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
    const { isLogged, load } = React.useContext(AuthContext);

    if (load) return <Splash />

    return isLogged ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;