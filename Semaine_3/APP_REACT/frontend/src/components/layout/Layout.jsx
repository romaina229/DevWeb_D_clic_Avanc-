import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
    const { user } = useSelector(state => state.auth);
    const isAdmin = user?.role === 'admin';

    return (
        <>
            <CustomNavbar />
            <Container fluid>
                <Row>
                    {isAdmin && (
                        <Col md={2} className="p-0">
                            <Sidebar />
                        </Col>
                    )}
                    <Col md={isAdmin ? 10 : 12}>
                        <div className="main-content">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Layout;