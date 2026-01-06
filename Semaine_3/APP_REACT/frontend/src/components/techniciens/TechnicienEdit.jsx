import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

function TechnicienEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        specialite: '',
        adresse: '',
        description: '',
        date_embauche: ''
    });

    useEffect(() => {
        fetchTechnicien();
    }, [id]);

    const fetchTechnicien = async () => {
        try {
            const response = await api.get(`/techniciens/${id}`);
            const tech = response.data;
            
            // Formater la date pour l'input date
            const formattedDate = tech.date_embauche 
                ? new Date(tech.date_embauche).toISOString().split('T')[0]
                : '';

            setFormData({
                nom: tech.nom || '',
                email: tech.email || '',
                telephone: tech.telephone || '',
                specialite: tech.specialite || '',
                adresse: tech.adresse || '',
                description: tech.description || '',
                date_embauche: formattedDate
            });
        } catch (err) {
            setError('Erreur lors du chargement du technicien');
        } finally {
            setLoading(false);
        }
    };

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
        setSaving(true);

        try {
            await api.put(`/techniciens/${id}`, formData);
            setSuccess('Technicien mis à jour avec succès');
            
            // Redirection après un délai
            setTimeout(() => {
                navigate(`/techniciens/${id}`);
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setSaving(false);
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
                <h1>Modifier le Technicien</h1>
                <Button variant="secondary" onClick={() => navigate(`/techniciens/${id}`)}>
                    Annuler
                </Button>
            </div>

            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
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
                            </Col>
                            <Col md={6}>
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
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
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
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date d'embauche</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_embauche"
                                        value={formData.date_embauche}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={saving}
                                className="px-5"
                            >
                                {saving ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default TechnicienEdit;