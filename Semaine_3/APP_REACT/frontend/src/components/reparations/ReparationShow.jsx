import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Spinner, Alert, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import api from '../../services/api';

function ReparationShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reparation, setReparation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [techniciens, setTechniciens] = useState([]);

    useEffect(() => {
        fetchReparation();
        fetchTechniciens();
    }, [id]);

    const fetchReparation = async () => {
        try {
            const response = await api.get(`/reparations/${id}`);
            setReparation(response.data);
        } catch (err) {
            setError('Erreur lors du chargement de la réparation');
        } finally {
            setLoading(false);
        }
    };

    const fetchTechniciens = async () => {
        try {
            const response = await api.get(`/reparations/${id}/techniciens`);
            setTechniciens(response.data);
        } catch (err) {
            console.error('Erreur lors du chargement des techniciens:', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réparation?')) {
            try {
                await api.delete(`/reparations/${id}`);
                navigate('/reparations');
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'en_attente': return <Badge bg="secondary">En attente</Badge>;
            case 'en_cours': return <Badge bg="warning">En cours</Badge>;
            case 'termine': return <Badge bg="success">Terminé</Badge>;
            case 'annule': return <Badge bg="danger">Annulé</Badge>;
            default: return <Badge bg="secondary">Inconnu</Badge>;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const calculateProgress = () => {
        if (!reparation) return 0;
        
        const start = new Date(reparation.date_debut);
        const end = new Date(reparation.date_fin_prevue);
        const today = new Date();
        
        if (today >= end) return 100;
        if (today <= start) return 0;
        
        const total = end - start;
        const elapsed = today - start;
        return Math.min((elapsed / total) * 100, 100);
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

    if (!reparation) return (
        <Container>
            <Alert variant="warning">Réparation non trouvée</Alert>
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Détails de la Réparation</h1>
                <div>
                    <Button as={Link} to="/reparations" variant="secondary" className="me-2">
                        <i className="bi bi-arrow-left me-1"></i>
                        Retour
                    </Button>
                    <Button as={Link} to={`/reparations/${id}/edit`} variant="warning" className="me-2">
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
                        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                {reparation.type}
                                <span className="ms-3">{getStatusBadge(reparation.statut)}</span>
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <div className="mb-3">
                                        <strong>Véhicule:</strong>
                                        <p>
                                            {reparation.vehicule ? (
                                                <Link to={`/vehicules/${reparation.vehicule_id}`}>
                                                    {reparation.vehicule.immatriculation} - {reparation.vehicule.marque} {reparation.vehicule.modele}
                                                </Link>
                                            ) : 'N/A'}
                                        </p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Description:</strong>
                                        <p>{reparation.description || 'Aucune description'}</p>
                                    </div>
                                </Col>
                                
                                <Col md={6}>
                                    <div className="mb-3">
                                        <strong>Dates:</strong>
                                        <p>
                                            Début: {formatDate(reparation.date_debut)}<br/>
                                            Fin prévue: {formatDate(reparation.date_fin_prevue)}
                                        </p>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <strong>Coûts:</strong>
                                        <p>
                                            Estimé: {reparation.cout_estime?.toLocaleString('fr-FR') || '0'} €<br/>
                                            Réel: {reparation.cout_reel?.toLocaleString('fr-FR') || 'Non défini'} €
                                        </p>
                                    </div>
                                </Col>
                            </Row>

                            {reparation.notes && (
                                <div className="mt-3">
                                    <strong>Notes supplémentaires:</strong>
                                    <p className="border p-3 rounded bg-light">{reparation.notes}</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header>
                            <strong>Progression</strong>
                        </Card.Header>
                        <Card.Body>
                            <ProgressBar 
                                now={calculateProgress()} 
                                label={`${Math.round(calculateProgress())}%`}
                                className="mb-3"
                            />
                            
                            <div className="d-flex justify-content-between text-muted small">
                                <span>{formatDate(reparation.date_debut)}</span>
                                <span>Aujourd'hui</span>
                                <span>{formatDate(reparation.date_fin_prevue)}</span>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>
                            <strong>Techniciens affectés</strong>
                        </Card.Header>
                        <Card.Body>
                            {techniciens.length > 0 ? (
                                <ListGroup>
                                    {techniciens.map(technicien => (
                                        <ListGroup.Item key={technicien.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{technicien.nom}</strong>
                                                    <div className="text-muted small">
                                                        {technicien.specialite}
                                                    </div>
                                                </div>
                                                <Badge bg="info">
                                                    {technicien.heures_travail || 0} heures
                                                </Badge>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <Alert variant="info">
                                    Aucun technicien affecté à cette réparation
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Header>Statistiques</Card.Header>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h3>{techniciens.length}</h3>
                                <p>Techniciens affectés</p>
                            </div>
                            
                            <div className="text-center mb-3">
                                <h3>
                                    {techniciens.reduce((sum, t) => sum + (t.heures_travail || 0), 0)}
                                </h3>
                                <p>Heures de travail totales</p>
                            </div>
                            
                            <div className="text-center">
                                <h3>
                                    {reparation.cout_reel?.toLocaleString('fr-FR') || '0'} F cfa
                                </h3>
                                <p>Coût total</p>
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
                                to={`/technicien-reparations/create?reparation_id=${id}`}
                            >
                                <i className="bi bi-person-plus me-2"></i>
                                Affecter un technicien
                            </Button>
                            
                            {reparation.statut === 'en_cours' && (
                                <Button variant="outline-success" className="w-100 mb-2">
                                    <i className="bi bi-check-circle me-2"></i>
                                    Marquer comme terminé
                                </Button>
                            )}
                            
                            <Button variant="outline-info" className="w-100 mb-2">
                                <i className="bi bi-file-pdf me-2"></i>
                                Générer une facture
                            </Button>
                            
                            <Button variant="outline-warning" className="w-100">
                                <i className="bi bi-clock-history me-2"></i>
                                Mettre à jour le statut
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ReparationShow;