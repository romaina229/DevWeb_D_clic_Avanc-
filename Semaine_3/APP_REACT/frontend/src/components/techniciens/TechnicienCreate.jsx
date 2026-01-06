import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import api from '../../services/api';

function TechnicienCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        specialite: '',
        adresse: '',
        description: '',
        date_embauche: new Date().toISOString().split('T')[0],
        password: 'password123', // Mot de passe par défaut
        role: 'technicien'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await api.post('/techniciens', formData);
            setSuccess('Technicien créé avec succès');
            
            // Redirection après un délai
            setTimeout(() => {
                navigate('/techniciens');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Ajouter un Technicien</h1>
                <Button variant="secondary" onClick={() => navigate('/techniciens')}>
                    Annuler
                </Button>
            </div>

            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom complet *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Spécialité *</Form.Label>
                            <Form.Select
                                name="specialite"
                                value={formData.specialite}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez une spécialité</option>
                                <option value="Mécanique générale">Mécanique générale</option>
                                <option value="Carrosserie">Carrosserie</option>
                                <option value="Électricité automobile">Électricité automobile</option>
                                <option value="Climatisation">Climatisation</option>
                                <option value="Freinage">Freinage</option>
                                <option value="Diagnostic">Diagnostic</option>
                                <option value="Direction">Direction/Suspension</option>
                                <option value="Moteur">Moteur</option>
                                <option value="Transmission">Transmission</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={loading}
                                className="px-5"
                            >
                                {loading ? 'Création...' : 'Créer'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default TechnicienCreate;