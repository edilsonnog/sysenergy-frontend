import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard/dashboard";
import Login from "../pages/Login";
import ListaPermissoes from "../pages/Usuarios/listaPermissoes";
import ListaRoles from "../pages/Usuarios/listaRoles";
import ListaUsuario from "../pages/Usuarios/listaUsuario";
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoutes path="/dashboard"  component={Dashboard} />
            <PrivateRoutes path="/usuarios"  component={ListaUsuario} role="ROLE_ADMIN" />
            <PrivateRoutes path="/permissoes" component={ListaPermissoes} role="ROLE_ADMIN" />
            <PrivateRoutes path="/roles" component={ListaRoles} role="ROLE_ADMIN" />
        </Switch>
    )

}

export default Routes;