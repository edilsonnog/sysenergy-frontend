import React, { Component, useEffect, useState } from 'react'
import { ReactElement } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface RoutesPropsData extends RouteComponentProps {
    role?: string;
    path: string;
}

const PrivateRoutes: React.FC<RoutesPropsData> = ({
    path,
    role,
    children,
    ...rest }) => {
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
        return <Redirect to="/" />;
    }

    if (!role && userLogged()) {
        return <Route {...rest} />;
    }
    return (
        <Route
            path= {path}
            {...rest}
            render={props => {
                    return permissions ? <Component {...props} /> : <Redirect to='/' />;
                }
            } />);
}

export default PrivateRoutes;