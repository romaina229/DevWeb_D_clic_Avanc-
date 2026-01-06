import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Alert, Badge, ListGroup, Tab, Tabs } from 'react-bootstrap';
import api from '../../services/api';

function VehiculeShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicule, setVehicule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reparations, setReparations] = useState([]);

    useEffect(() => {
        fetchVehicule();
        fetchReparations();
    }, [id]);

    const fetchVehicule = async () => {
        try {
            const response = await api.get(`/vehicules/${id}`);
            setVehicule(response.data);
        } catch (err) {
            setError('Erreur lors du chargement du véhicule');
        } finally {
            setLoading(false);
        }
    };

    const fetchReparations = async () => {
        try {
            const response = await api.get(`/vehicules/${id}/reparations`);
            setReparations(response.data);
        } catch (err) {
            console.error('Erreur lors du chargement des réparations:', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule?')) {
            try {
                await api.delete(`/vehicules/${id}`);
                navigate('/vehicules');
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'disponible': return <Badge bg="success">Disponible</Badge>;
            case 'en_reparation': return <Badge bg="warning">En réparation</Badge>;
            case 'hors_service': return <Badge bg="danger">Hors service</Badge>;
            default: return <Badge bg="secondary">Inconnu</Badge>;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
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

    if (!vehicule) return (
        <Container>
            <Alert variant="warning">Véhicule non trouvé</Alert>
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Détails du Véhicule</h1>
                <div>
                    <Button as={Link} to="/vehicules" variant="secondary" className="me-2">
                        <i className="bi bi-arrow-left me-1"></i>
                        Retour
                    </Button>
                    <Button as={Link} to={`/vehicules/${id}/edit`} variant="warning" className="me-2">
                        <i className="bi bi-pencil me-1"></i>
                        Modifier
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        <i className="bi bi-trash me-1"></i>
                        Supprimer
                    </Button>
                </div>
            </div>

            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">
                                {vehicule.marque} {vehicule.modele} 
                                <span className="ms-3">{getStatusBadge(vehicule.statut)}</span>
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <strong>Immatriculation:</strong>
                                        <p className="fs-5">{vehicule.immatriculation}</p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Année:</strong>
                                        <p>{vehicule.annee}</p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Kilométrage:</strong>
                                        <p>{vehicule.kilometrage?.toLocaleString()} km</p>
                                    </div>
                                </Col>
                                
                                <Col md={6}>
                                    <div className="mb-3">
                                        <strong>Couleur:</strong>
                                        <p>{vehicule.couleur || 'Non spécifié'}</p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Type de carburant:</strong>
                                        <p>{vehicule.carburant || 'Non spécifié'}</p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Puissance:</strong>
                                        <p>{vehicule.puissance ? `${vehicule.puissance} CH` : 'Non spécifié'}</p>
                                    </div>
                                </Col>
                            </Row>

                            {vehicule.description && (
                                <div className="mt-3">
                                    <strong>Description:</strong>
                                    <p>{vehicule.description}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    <Tabs defaultActiveKey="reparations" className="mb-4">
                        <Tab eventKey="reparations" title="Historique des Réparations">
                            <Card>
                                <Card.Body>
                                    {reparations.length > 0 ? (
                                        <ListGroup>
                                            {reparations.map(reparation => (
                                                <ListGroup.Item key={reparation.id}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <strong>{reparation.type}</strong>
                                                            <div className="text-muted small">
                                                                {formatDate(reparation.date_debut)} - {formatDate(reparation.date_fin_prevue)}
                                                            </div>
                                                        </div>
                                                        <Badge bg={reparation.statut === 'termine' ? 'success' : 'warning'}>
                                                            {reparation.statut}
                                                        </Badge>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <Alert variant="info">
                                            Aucune réparation enregistrée pour ce véhicule
                                        </Alert>
                                    )}
                                </Card.Body>
                            </Card>
                        </Tab>
                        
                        <Tab eventKey="documents" title="Documents">
                            <Card>
                                <Card.Body>
                                    <Alert variant="info">
                                        Aucun document disponible pour le moment
                                    </Alert>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </Col>

                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Header>Statistiques</Card.Header>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h3>{reparations.length}</h3>
                                <p>Réparations effectuées</p>
                            </div>
                            
                            <div className="text-center">
                                <h3>
                                    {reparations
                                        .filter(r => r.statut === 'termine')
                                        .reduce((sum, r) => sum + (r.cout || 0), 0)
                                        .toLocaleString('fr-FR')} €
                                </h3>
                                <p>Coût total des réparations</p>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>Actions rapides</Card.Header>
                        <Card.Body>
                            <Button 
                                variant="outline-primary" 
                                className="w-100 mb-2"
                                as={Link}
                                to={`/reparations/create?vehicule_id=${id}`}
                            >
                                <i className="bi bi-wrench me-2"></i>
                                Nouvelle réparation
                            </Button>
                            
                            <Button variant="outline-success" className="w-100 mb-2">
                                <i className="bi bi-file-pdf me-2"></i>
                                Générer un rapport
                            </Button>
                            
                            <Button variant="outline-info" className="w-100">
                                <i className="bi bi-calendar-check me-2"></i>
                                Planifier un entretien
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default VehiculeShow;