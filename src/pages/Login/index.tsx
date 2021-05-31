import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle as farFaUserCircle } from '@fortawesome/free-regular-svg-icons'*/
import loginIcon from '../../images/user.svg'
import uiImg from '../../images/login.svg';
import './styles.css'

const Login: React.FC = () => {
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                        <img className="icon-img" src={loginIcon} alt="icon"/>
                        <Form className="formcont">
                            <Form.Group controlId="formBasicEmail" className="formcont">
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="formcont">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary " block type="submit">Login</Button>

                            <div className="text-left mt-3">
                              {/*<a href="#"><small className="reset">Password Reset</small></a> II
                                <a href="#"><small className="reset ml-2">Quick Recover</small></a> */}  
                            </div>
                        </Form>
                    </Col>

                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={uiImg} alt=""/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;