import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Spinner, Badge, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

function ReparationsList() {
    const [reparations, setReparations] = useState([]);
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('tous');
    const navigate = useNavigate();

    useEffect(() => {
        fetchReparations();
    }, []);

    const fetchReparations = async () => {
    try {
        let url = '/reparations';
        if (user?.role === 'technicien') {
            url = `/techniciens/${user.id}/reparations`;
        }
        const response = await api.get(url);
        setReparations(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des réparations');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réparation?')) {
            try {
                await api.delete(`/reparations/${id}`);
                setReparations(reparations.filter(reparation => reparation.id !== id));
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

    const filteredReparations = reparations.filter(reparation => {
        const matchesSearch = 
            reparation.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reparation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reparation.vehicule?.immatriculation?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === 'tous' || reparation.statut === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Liste des Réparations</h1>
                <div>
                    <Dropdown className="d-inline me-2">
                        <Dropdown.Toggle variant="outline-primary">
                            <i className="bi bi-funnel me-2"></i>
                            Filtres
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilterStatus('tous')}>
                                Tous les statuts
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => setFilterStatus('en_attente')}>
                                En attente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterStatus('en_cours')}>
                                En cours
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterStatus('termine')}>
                                Terminé
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterStatus('annule')}>
                                Annulé
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Button as={Link} to="/reparations/create" variant="primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nouvelle Réparation
                    </Button>
                </div>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-4">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Rechercher par type, description ou immatriculation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Véhicule</th>
                        <th>Type</th>
                        <th>Date début</th>
                        <th>Date fin prévue</th>
                        <th>Coût estimé</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReparations.map(reparation => (
                        <tr key={reparation.id}>
                            <td>{reparation.id}</td>
                            <td>
                                {reparation.vehicule ? (
                                    <Link to={`/vehicules/${reparation.vehicule_id}`}>
                                        {reparation.vehicule.immatriculation}
                                    </Link>
                                ) : 'N/A'}
                            </td>
                            <td>{reparation.type}</td>
                            <td>{formatDate(reparation.date_debut)}</td>
                            <td>{formatDate(reparation.date_fin_prevue)}</td>
                            <td>{reparation.cout_estime?.toLocaleString('fr-FR')} €</td>
                            <td>{getStatusBadge(reparation.statut)}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    onClick={() => navigate(`/reparations/${reparation.id}`)}
                                    className="me-2"
                                >
                                    <i className="bi bi-eye"></i>
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    onClick={() => navigate(`/reparations/${reparation.id}/edit`)}
                                    className="me-2"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(reparation.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {filteredReparations.length === 0 && (
                <Alert variant="info">
                    {searchTerm || filterStatus !== 'tous' 
                        ? 'Aucune réparation trouvée pour votre recherche' 
                        : 'Aucune réparation enregistrée'
                    }
                </Alert>
            )}
        </Container>
    );
}

export default ReparationsList;