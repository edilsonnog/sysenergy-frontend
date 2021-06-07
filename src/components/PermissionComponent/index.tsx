import React, { useEffect, useState } from 'react'
import api from '../../services/api';

interface PermissionComponenetProps {
    role: string;
}

const PermissionComponent: React.FC<PermissionComponenetProps> = ({role, children}) => {
    const [permissions, setPermissions] = useState([] as string[])

    useEffect(() => {
        async function loadRoles() {
            const response = api.get('/users/roles');
            const findRole = (await response).data.some((r: string) => 
                role?.split(",").includes(r));
            setPermissions(findRole);
        }
        loadRoles();
    }, [role])
    return(
        <>
            {permissions && children}
        </>
    )
}

export default PermissionComponent;