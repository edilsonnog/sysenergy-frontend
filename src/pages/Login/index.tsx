import React, { useCallback, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as farFaUserCircle } from '@fortawesome/free-regular-svg-icons'*/
import loginIcon from '../../images/user.svg'
import uiImg from '../../images/login.svg';
import './styles.css'
import { useAuth } from '../../context/AuthContext';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        await signIn({ username, password })
        history.push('/dashboard')
    }, [username, password]);
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                        <Form className="formcont" onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicUser" className="formcont">
                                <Form.Control type="text" placeholder="Enter com seu login"
                                    onChange={(event) => setUsername(event.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="formcont">
                                <Form.Control type="password" placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)} />
                            </Form.Group>

                            <Button variant="primary " block type="submit">Login</Button>

                            <div className="text-left mt-3">
                                {/*<a href="#"><small className="reset">Password Reset</small></a> II
                                <a href="#"><small className="reset ml-2">Quick Recover</small></a> */}
                            </div>
                        </Form>
                    </Col>

                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={uiImg} alt="" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;