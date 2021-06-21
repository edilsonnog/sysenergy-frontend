import React, { useEffect, useState } from 'react'
import { Redirect, Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface RouteProps extends ReactDOMRouteProps {
    role?: string;
    path: string;
    component: React.ComponentType;
}

const PrivateRoutes: React.FC<RouteProps> = ({role, component: Component, ...rest }) => {
    const [permissions, setPermissions] = useState([] as string[]);
    useEffect(() => {
        async function loadRoles() {
            const response = api.get('/users/roles');
            const findRole = (await response).data.some((r: string) =>
                role?.split(",").includes(r));
            setPermissions(findRole);
        }
        loadRoles();
    }, [role])
    const { userLogged } = useAuth();

    if (!userLogged()) {
        return <Redirect to="/dashboard" />;
    }

    if (!role && userLogged()) {
        return <ReactDOMRoute {...rest} />;
    }
    return <ReactDOMRoute {...rest}>
        {permissions ?
            <Component />
            :
            <Redirect to="/dashboard" />
        }
    </ReactDOMRoute>
    //permissions ? (<Route path={props.path} component={props.component} />) : <Redirect to='/dashboard' />;
}

export default PrivateRoutes;