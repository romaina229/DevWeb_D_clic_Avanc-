import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

function VehiculeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        immatriculation: '',
        marque: '',
        modele: '',
        annee: '',
        kilometrage: '',
        couleur: '',
        carburant: '',
        puissance: '',
        statut: 'disponible',
        description: ''
    });

    useEffect(() => {
        fetchVehicule();
    }, [id]);

    const fetchVehicule = async () => {
        try {
            const response = await api.get(`/vehicules/${id}`);
            const vehicule = response.data;
            
            setFormData({
                immatriculation: vehicule.immatriculation || '',
                marque: vehicule.marque || '',
                modele: vehicule.modele || '',
                annee: vehicule.annee || '',
                kilometrage: vehicule.kilometrage || '',
                couleur: vehicule.couleur || '',
                carburant: vehicule.carburant || 'essence',
                puissance: vehicule.puissance || '',
                statut: vehicule.statut || 'disponible',
                description: vehicule.description || ''
            });
        } catch (err) {
            setError('Erreur lors du chargement du véhicule');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || '' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            await api.put(`/vehicules/${id}`, formData);
            setSuccess('Véhicule mis à jour avec succès');
            
            setTimeout(() => {
                navigate(`/vehicules/${id}`);
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
                <h1>Modifier le Véhicule</h1>
                <Button variant="secondary" onClick={() => navigate(`/vehicules/${id}`)}>
                    <i className="bi bi-x-circle me-1"></i>
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
                                    <Form.Label>Immatriculation *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="immatriculation"
                                        value={formData.immatriculation}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Statut *</Form.Label>
                                    <Form.Select
                                        name="statut"
                                        value={formData.statut}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="disponible">Disponible</option>
                                        <option value="en_reparation">En réparation</option>
                                        <option value="hors_service">Hors service</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Marque *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="marque"
                                        value={formData.marque}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Modèle *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="modele"
                                        value={formData.modele}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Année *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="annee"
                                        min="1900"
                                        max={new Date().getFullYear() + 1}
                                        value={formData.annee}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kilométrage</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="kilometrage"
                                        min="0"
                                        step="1000"
                                        value={formData.kilometrage}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="couleur"
                                        value={formData.couleur}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type de carburant</Form.Label>
                                    <Form.Select
                                        name="carburant"
                                        value={formData.carburant}
                                        onChange={handleChange}
                                    >
                                        <option value="essence">Essence</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electrique">Électrique</option>
                                        <option value="hybride">Hybride</option>
                                        <option value="gpl">GPL</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Puissance (CH)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="puissance"
                                        min="0"
                                        value={formData.puissance}
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

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate(`/vehicules/${id}`)}
                            >
                                Annuler
                            </Button>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={saving}
                                className="px-5"
                            >
                                {saving ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Enregistrement...
                                    </>
                                ) : 'Enregistrer'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default VehiculeEdit;