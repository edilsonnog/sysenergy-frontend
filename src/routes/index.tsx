import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard/dashboard";
import Login from "../pages/Login";
import ListaPermissoes from "../pages/Usuarios/listaPermissoes";
import ListaUsuario from "../pages/Usuarios/listaUsuario";
import PrivateRoutes from "./PrivateRoutes";



const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoutes path="/dashboard"  component={Dashboard} />
            <PrivateRoutes path="/usuarios"  component={ListaUsuario} />
            <PrivateRoutes path="/permissoes" component={ListaPermissoes}/>
        </Switch>
    )

}

export default Routes;