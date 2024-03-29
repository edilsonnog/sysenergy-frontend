import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import api from '../../services/api';
import { Pagination, PaginationButton, PaginationItem } from './styles'
import './lista.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


interface UsuariosData {
    id: string;
    name: string;
    username: string;
    password: string;
    roles: string;
    description: string;
    state: string;
    UsuarioInc: string;
    UsuarioAlt: string;
    DataAlt: number;
}
interface RolesData {
    id: string;
    name: string;
    description: string;
}

const ListaUsuario: React.FC = () => {
    const userLogado = localStorage.getItem("UserLogado")

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [usuarios, setUsuarios] = useState<UsuariosData[]>([] as UsuariosData[]);
    const [vroles, setVRoles] = useState<RolesData[]>([] as RolesData[]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [busca, setBusca] = useState('');
    const [status, setStatus] = useState(false);
    const [limpa, setLimpa] = useState(false)
    const [erro, setErro] = useState("");
    const [mostrarError, setMostrarError] = useState("invisible");

    //usuarios
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState("");
    const [roles, setRoles] = useState("");
    const [UsuarioInc, setUsuarioInc] = useState<string|null>("")
    const [UsuarioAlt, setUsuarioAlt] = useState<string|null>("")
    const [DataAlt, setDataAlt] = useState(new Date())

    

    useEffect(() => {
        async function loadUsuarios() {
            const qtde = await api.get(`/users?busca=${busca}`);
            setTotal(qtde.data.length);
            const response = await api.get(`/usuarios?busca=${busca}&page=${currentPage}&limit=${limit}`);
            const totalPages = Math.ceil(total / limit);
            const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            }
            setPages(arrayPages);
            const nrole = await api.get("/roles");
            setUsuarios(response.data);
            setVRoles(nrole.data);
        //    console.log(userLogado)
            setUsuarioInc(userLogado)
         //   console.log(UsuarioInc)
            setUsuarioAlt(userLogado)
        }
        loadUsuarios();
    }, [limit, total, currentPage, busca, userLogado, UsuarioInc]);

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, [])


    const validaFormulario = (e: any) => {
        e.preventDefault();

        if (name === null || name.length <= 8 || name.trim() === "") {
            setErro("* O nome não pode ficar vazio ou ter menos de 8 Caracteres");
            setMostrarError("visible");
            setShow(true);
            return;
        }

        if (username === null || username.length <= 0 || username.trim() === "") {
            setErro("* O Username não pode ficar vazio");
            setMostrarError("visible");
            setShow(true);
            return;
        }

        if (id) {
            alteraUsuario(id)
        } else {
            if (password === null || password.length <= 4 || password.trim() === "") {
                setErro("* O Password não pode ficar vazio ou ter menos 4 Caracteres");
                setMostrarError("visible");
                setShow(true);
                return;
            }
            adicionaUsuario();
        }
        handleClose()
    }

    const openSidebar = () => {
        setSidebarOpen(true);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const handelChecked = useCallback((e) => {
        setState('')
        if (e.target.checked) {
            setState('Ativo')
        } else {
            setState('Inativo')
        }

    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => {
        if (limpa) {
            setTimeout(() => { window.location.reload(); }, 3500);
        }
        setShow(false);
    }

    const handleShowEnabled = () => {
        setStatus(false)
        setShow(true);
        setLimpa(false)
    }

    async function pegaUser(cod: any) {
        setStatus(false)
        setLimpa(true)
        await api.get(`/users/${cod}`)
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setUsername(response.data.username);
                setRoles(response.data.roles[0].id);
                setState(response.data.state)
                setShow(true);
            });
    }
    async function pegaUserView(cod: any) {
        setStatus(true)
        setLimpa(true)
        await api.get(`/users/${cod}`)
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setUsername(response.data.username);
                setRoles(response.data.roles[0].id);
                setState(response.data.state)
                setShow(true);
            });
    }

    async function alteraUsuario(cod: any) {
    //    setUsuarioAlt(userLogado)
        const now = new Date();
        setDataAlt(now)
        await api.put(`/users/${cod}`, {
            name,
            username,
            password,
            roles,
            state,
            UsuarioAlt,
            DataAlt,
        });
        toast.success('Usuário alterado com sucesso!')
    }
    async function adicionaUsuario() {
 //       setUsuarioInc(userLogado)
        await api.post("/users", {
            name,
            username,
            password,
            roles,
            state,
            UsuarioInc,
        });
        toast.success('Usuário salvo com sucesso!')
        setTimeout(() => { window.location.reload(); }, 3500);
    }

    return (
        <div className="user_container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Navbar sidebarOpen={sidebarOpen} openSiderbar={openSidebar} />
            <main>
                <div className="main__container">
                    <div className="main__title">
                        <div className="main__greeting">
                            <h1>Usuários</h1>
                            <p>Relação de usuários para acesso ao sistema</p>
                        </div>
                        <Button variant="primary" onClick={handleShowEnabled}>Novo Usuário</Button>
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
                                    <th scope="col" className="col-3">Nome do usuário</th>
                                    <th scope="col" className="col-2">Username</th>
                                    <th scope="col" className="col-2">Perfil</th>
                                    <th scope="col" className="col-2">Status</th>
                                    <th scope="col" className="col-3">Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.description}</td>
                                        <td>{user.state}</td>
                                        <td>
                                            <div>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Visualizar</Tooltip>}>
                                                    <span className="d-inline-block btn_func">
                                                        <Button
                                                            className="topBt"
                                                            variant="outline-info"
                                                            onClick={() => pegaUserView(user.id)}
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
                                                            onClick={() => pegaUser(user.id)}
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
                    <Form onSubmit={validaFormulario}>
                        <Form.Group >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                disabled={status}
                                type="name"
                                placeholder="Enter Nome"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                disabled={status}
                                type="username"
                                placeholder="Enter Username"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                disabled={status}
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Selecione o Perfil</Form.Label>
                            <Form.Control
                                disabled={status}
                                as="select"
                                type="roles"
                                name="roles"
                                onChange={(e) => setRoles(e.target.value)}
                                value={roles}
                            >
                                <option value="">Selecione um Perfil</option>
                                {vroles.map((nroles) => (
                                    <option key={nroles.id} value={nroles.id}>{nroles.description}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <br />
                        <div>
                            <Form.Check
                                label={state === "" ? "Status: Ativo ou Inativo" : state}
                                type="checkbox"
                                onChange={handelChecked}
                                checked={state === 'Ativo' ? true : false}
                                disabled={status}
                            />
                        </div>
                        <div className={`alert alert-danger ${mostrarError}`}>{erro}</div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} >Cancela</Button>
                            <Button variant="primary" type="submit" disabled={status} >Salvar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ListaUsuario;