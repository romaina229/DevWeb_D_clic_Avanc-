// src/components/techniciens/TechniciensList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function TechniciensList() {
    const [techniciens, setTechniciens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTechniciens();
    }, []);

    const fetchTechniciens = async () => {
        try {
            const response = await api.get('/techniciens');
            setTechniciens(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des techniciens');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce technicien?')) {
            try {
                await api.delete(`/techniciens/${id}`);
                setTechniciens(techniciens.filter(tech => tech.id !== id));
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Liste des Techniciens</h1>
                <Button as={Link} to="/techniciens/create" variant="primary">
                    Ajouter un Technicien
                </Button>
            </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Spécialité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {techniciens.map(technicien => (
                        <tr key={technicien.id}>
                            <td>{technicien.id}</td>
                            <td>{technicien.nom}</td>
                            <td>{technicien.email}</td>
                            <td>{technicien.specialite}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    onClick={() => navigate(`/techniciens/${technicien.id}`)}
                                    className="me-2"
                                >
                                    Voir
                                </Button>
                                <Button 
                                    variant="warning" 
                                    size="sm" 
                                    onClick={() => navigate(`/techniciens/${technicien.id}/edit`)}
                                    className="me-2"
                                >
                                    Modifier
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleDelete(technicien.id)}
                                >
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default TechniciensList;