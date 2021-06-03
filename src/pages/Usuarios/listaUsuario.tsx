import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import api from '../../services/api';
import './lista.css'

interface UsuariosData {
    id: string;
    name: string,
    username: string;
}

const ListaUsuario: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [usuarios, setUsuarios] = useState<UsuariosData[]>([] as UsuariosData[]);
    useEffect(() => {
        api.get("/usuarios").then((response) => setUsuarios(response.data));
    })
    const openSidebar = () => {
        setSidebarOpen(true);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="user_container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Navbar sidebarOpen={sidebarOpen} openSiderbar={openSidebar} />
            <main>
                <div className="main__container">
                    <div className="main__title">
                        <div className="main__greeting">
                            <h1>Lista de Usuários</h1>
                            <p>Relação de usuários para acesso ao sistema</p>
                        </div>
                    </div>
                    <div className="main__tab">
                        <Table className="table table-striped" size="sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="col-3">Nome do usuário</th>
                                    <th scope="col" className="col-3">Username</th>
                                    <th scope="col" className="col-3">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <div>
                                                <Button
                                                    className="topBt"
                                                    variant="outline-warning">
                                                    Editar
                                                </Button>{" "}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ListaUsuario;