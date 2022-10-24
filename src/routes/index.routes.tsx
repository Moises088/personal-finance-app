import React from "react";
import { AuthContext } from "../contexts/authContext";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
    const { isLogged } = React.useContext(AuthContext);

    return isLogged ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;