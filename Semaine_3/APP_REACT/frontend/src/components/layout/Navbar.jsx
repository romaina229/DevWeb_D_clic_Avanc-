import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';

function CustomNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logoutSuccess());
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Gestion Réparations
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuthenticated ? (
                        <>
                            <Nav className="me-auto">
                                {user?.role === 'admin' && (
                                    <Nav.Link as={Link} to="/dashboard">
                                        Tableau de bord
                                    </Nav.Link>
                                )}
                                <Nav.Link as={Link} to="/techniciens">
                                    Techniciens
                                </Nav.Link>
                                {user?.role === 'admin' && (
                                    <>
                                        <Nav.Link as={Link} to="/vehicules">
                                            Véhicules
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/reparations">
                                            Réparations
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/technicien-reparations">
                                            Affectations
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>
                            <Nav>
                                <Navbar.Text className="me-3">
                                    Connecté en tant que: <strong>{user?.name}</strong> ({user?.role})
                                </Navbar.Text>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Déconnexion
                                </Button>
                            </Nav>
                        </>
                    ) : (
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
                            <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;