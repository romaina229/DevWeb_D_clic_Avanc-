import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Spinner, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function VehiculesList() {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchVehicules();
    }, []);

    const fetchVehicules = async () => {
        try {
            const response = await api.get('/vehicules');
            setVehicules(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des véhicules');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule?')) {
            try {
                await api.delete(`/vehicules/${id}`);
                setVehicules(vehicules.filter(vehicule => vehicule.id !== id));
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const filteredVehicules = vehicules.filter(vehicule =>
        vehicule.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicule.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicule.immatriculation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch(status) {
            case 'disponible': return <Badge bg="success">Disponible</Badge>;
            case 'en_reparation': return <Badge bg="warning">En réparation</Badge>;
            case 'hors_service': return <Badge bg="danger">Hors service</Badge>;
            default: return <Badge bg="secondary">Inconnu</Badge>;
        }
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Liste des Véhicules</h1>
                <Button as={Link} to="/vehicules/create" variant="primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Ajouter un Véhicule
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-4">
                <InputGroup>
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Rechercher par marque, modèle ou immatriculation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Immatriculation</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Année</th>
                        <th>Kilométrage</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicules.map(vehicule => (
                        <tr key={vehicule.id}>
                            <td>{vehicule.id}</td>
                            <td>
                                <strong>{vehicule.immatriculation}</strong>
                            </td>
                            <td>{vehicule.marque}</td>
                            <td>{vehicule.modele}</td>
                            <td>{vehicule.annee}</td>
                            <td>{vehicule.kilometrage?.toLocaleString()} km</td>
                            <td>{getStatusBadge(vehicule.statut)}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    onClick={() => navigate(`/vehicules/${vehicule.id}`)}
                                    className="me-2"
                                >
                                    <i className="bi bi-eye"></i>
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    onClick={() => navigate(`/vehicules/${vehicule.id}/edit`)}
                                    className="me-2"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(vehicule.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {filteredVehicules.length === 0 && (
                <Alert variant="info">
                    {searchTerm ? 'Aucun véhicule trouvé pour votre recherche' : 'Aucun véhicule enregistré'}
                </Alert>
            )}
        </Container>
    );
}

export default VehiculesList;