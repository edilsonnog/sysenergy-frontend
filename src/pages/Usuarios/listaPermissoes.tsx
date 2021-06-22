import { faEye, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, FormControl, InputGroup, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import api from '../../services/api';
import './lista.css'
import { Pagination, PaginationButton, PaginationItem } from './styles';

interface PermissoesData {
    id: string;
    name: string;
    description: string;
}

const ListaPermissoes: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [busca, setBusca] = useState('');
    const [permissoes, setPermissoes] = useState<PermissoesData[]>([] as PermissoesData[]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState(false);
    const [show, setShow] = useState(false);
    //permissions
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const limpaCampos = () => {
        setId('');
        setName('');
        setDescription('');
    }

    const handleClose = () => setShow(false);
    const handleShowEnabled = () => {
        limpaCampos();
        setStatus(false)
        setShow(true);
    }

    const openSidebar = () => {
        setSidebarOpen(true);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function loadPermissions() {
            const qtde = await api.get(`/permission?busca=${busca}`);
            setTotal(qtde.data.length);
            const response = await api.get(`/permissions?busca=${busca}&page=${currentPage}&limit=${limit}`);
            const totalPages = Math.ceil(total / limit);
            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            }
            setPages(arrayPages);
            setPermissoes(response.data);
        }
        loadPermissions();
    }, [limit, total, currentPage, busca]);

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, [])

    async function pegaPermission(cod: any) {
        setStatus(false)
        await api.get(`/permissions/${cod}`)
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setDescription(response.data.description);
                setShow(true);
            });
    }

    async function pegaPermissionView(cod: any) {
        setStatus(true)
        await api.get(`/permissions/${cod}`)
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setDescription(response.data.description);
                setShow(true);
            });
    }

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (id) {
                await api.put(`/permissions/${id}`, {
                    name,
                    description,
                })
            } else {
                await api.post("/permissions", {
                    name,
                    description,
                });
            }

            window.location.reload();
        }, [name, description, id]
    );

    return (
        <div className="user_container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Navbar sidebarOpen={sidebarOpen} openSiderbar={openSidebar} />
            <main>
                <div className="main__container">
                    <div className="main__title">
                        <div className="main__greeting">
                            <h1>Permissões</h1>
                            <p>Relação de permissões para acesso ao sistema</p>
                        </div>
                        <Button variant="primary" onClick={handleShowEnabled}>Nova Permissão</Button>
                    </div>
                    <div className="main__tab">
                        <>
                            <InputGroup className="col-md-3 mb-3 inp">
                                <InputGroup.Text id="basic-addon1">Busca :</InputGroup.Text>
                                <FormControl className="col-md-3"
                                    placeholder="Digite sua Buscar"
                                    value={busca}
                                    onChange={(ev) => setBusca(ev.target.value)}
                                />
                            </InputGroup>
                        </>
                        <Table className="table table-striped" size="sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="col-3">Nome</th>
                                    <th scope="col" className="col-3">Descrição</th>
                                    <th scope="col" className="col-3">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissoes.map((permission) => (
                                    <tr key={permission.id}>
                                        <td>{permission.name}</td>
                                        <td>{permission.description}</td>
                                        <td>
                                            <div>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Visualizar</Tooltip>}>
                                                    <span className="d-inline-block btn_func">
                                                        <Button
                                                            className="topBt"
                                                            variant="outline-info"
                                                            onClick={() => pegaPermissionView(permission.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Button>{" "}
                                                    </span>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit</Tooltip>}>
                                                    <span className="d-inline-block btn_func">
                                                        <Button
                                                            className="topBt"
                                                            variant="outline-warning"
                                                            onClick={() => pegaPermission(permission.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faUserEdit} />
                                                        </Button>{" "}
                                                    </span>
                                                </OverlayTrigger>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            <div>Qtd de Registros: {total}</div>
                            <div>
                                <select className="form-select" onChange={limits}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <PaginationButton>
                                {currentPage > 1 && (
                                    <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
                                        Previous</PaginationItem>
                                )}
                                {pages.map(page => (
                                    <PaginationItem isSelect={page === currentPage}
                                        key={page} onClick={() => setCurrentPage(page)} >
                                        {page}
                                    </PaginationItem>
                                ))}
                                {currentPage < pages.length && (
                                    <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginationItem>
                                )}
                            </PaginationButton>
                        </Pagination>
                    </div>
                </div>
            </main>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Cadastro de Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                disabled={status}
                                type="name"
                                placeholder="Enter nome da Permissão"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                disabled={status}
                                type="description"
                                placeholder="Enter Descrição"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancela</Button>
                            <Button variant="primary" type="submit" disabled={status} onClick={handleClose}>Salvar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ListaPermissoes;