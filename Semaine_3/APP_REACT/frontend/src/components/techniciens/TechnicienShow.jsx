import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import api from '../../services/api';

function TechnicienShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [technicien, setTechnicien] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTechnicien();
    }, [id]);

    const fetchTechnicien = async () => {
        try {
            const response = await api.get(`/techniciens/${id}`);
            setTechnicien(response.data);
        } catch (err) {
            setError('Erreur lors du chargement du technicien');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce technicien?')) {
            try {
                await api.delete(`/techniciens/${id}`);
                navigate('/techniciens');
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
        </Container>
    );

    if (error) return (
        <Container>
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    if (!technicien) return (
        <Container>
            <Alert variant="warning">Technicien non trouvé</Alert>
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Détails du Technicien</h1>
                <div>
                    <Button as={Link} to="/techniciens" variant="secondary" className="me-2">
                        Retour
                    </Button>
                    <Button as={Link} to={`/techniciens/${id}/edit`} variant="warning" className="me-2">
                        Modifier
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </div>
            </div>

            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-4">
                                {technicien.nom}
                                <Badge bg="info" className="ms-2">
                                    ID: {technicien.id}
                                </Badge>
                            </Card.Title>
                            
                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong>Email:</strong>
                                    <p>{technicien.email}</p>
                                </Col>
                                <Col md={6}>
                                    <strong>Téléphone:</strong>
                                    <p>{technicien.telephone || 'Non spécifié'}</p>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <strong>Spécialité:</strong>
                                    <p>{technicien.specialite}</p>
                                </Col>
                                <Col md={6}>
                                    <strong>Date d'embauche:</strong>
                                    <p>{new Date(technicien.date_embauche).toLocaleDateString()}</p>
                                </Col>
                            </Row>

                            {technicien.adresse && (
                                <div className="mb-3">
                                    <strong>Adresse:</strong>
                                    <p>{technicien.adresse}</p>
                                </div>
                            )}

                            {technicien.description && (
                                <div className="mb-3">
                                    <strong>Description:</strong>
                                    <p>{technicien.description}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Header>Statistiques</Card.Header>
                        <Card.Body>
                            <div className="text-center">
                                <h3>25</h3>
                                <p>Réparations effectuées</p>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Actions rapides</Card.Header>
                        <Card.Body>
                            <Button variant="outline-primary" className="w-100 mb-2">
                                Voir les réparations
                            </Button>
                            <Button variant="outline-success" className="w-100 mb-2">
                                Affecter une réparation
                            </Button>
                            <Button variant="outline-info" className="w-100">
                                Générer un rapport
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default TechnicienShow;