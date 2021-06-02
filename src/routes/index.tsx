import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard/dashboard";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";



const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoutes path="/dashboard"  component={Dashboard} />
        </Switch>
    )

}

export default Routes;