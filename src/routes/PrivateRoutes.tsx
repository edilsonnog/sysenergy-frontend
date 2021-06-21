import React, { useEffect, useState } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PrivateRoutes: React.FC<{
    role?: string;
    component: React.FC;
    path: string;
}> = (props, { ...rest }) => {
    const [permissions, setPermissions] = useState([] as string[]);
    const location = useLocation();
    useEffect(() => {
        async function loadRoles() {
            const response = api.get('/users/roles');
            const findRole = (await response).data.some((r: string) =>
                props.role?.split(",").includes(r));
            setPermissions(findRole);
        }
        loadRoles();
    }, [props.role])
    const { userLogged } = useAuth();

    if (!userLogged()) {
        return <Redirect to="/dashboard" />;
    }

    if (!props.role && userLogged()) {
        return <Route {...rest} />;
    }
    return <Route {...rest}>
        {permissions ?
            <props.component />
            :
            <Redirect to={{ pathname: "/dashboard", state: { from: location } }} />
        }
    </Route>
    //permissions ? (<Route path={props.path} component={props.component} />) : <Redirect to='/dashboard' />;
}

export default PrivateRoutes;