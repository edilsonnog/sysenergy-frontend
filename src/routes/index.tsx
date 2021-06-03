import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard/dashboard";
import Login from "../pages/Login";
import ListaUsuario from "../pages/Usuarios/listaUsuario";
import PrivateRoutes from "./PrivateRoutes";



const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoutes path="/dashboard"  component={Dashboard} />
            <PrivateRoutes path="/listaUser"  component={ListaUsuario} />
        </Switch>
    )

}

export default Routes;