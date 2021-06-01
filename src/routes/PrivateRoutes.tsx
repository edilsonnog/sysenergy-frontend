import React, { useEffect, useState } from 'react'
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface RoutesPropsData extends RouteProps {
    role?: string;
}

const PrivateRoutes: React.FC<RoutesPropsData> = ({ role, ...rest }) => {
    const [permissions, setPermissions] = useState([] as string[]);
    useEffect(() => {
        async function loadRoles() {
            const response = api.get('/users/roles');
            const findRole = (await response).data.find((r: string) => r === role);
            setPermissions(findRole);
        }
        loadRoles();
    }, [role])
    const { userLogged } = useAuth();

    if (!userLogged()){
        return <Redirect to= "/" />;
    }

    if (!role && userLogged()){
        return <Route {...rest} />;
    }
    return  permissions ? (<Route {...rest} />) : <Redirect to='/' />;
}

export default PrivateRoutes;