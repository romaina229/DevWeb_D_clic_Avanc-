import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

function VehiculeCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        immatriculation: '',
        marque: '',
        modele: '',
        annee: new Date().getFullYear().toString(),
        kilometrage: '',
        couleur: '',
        carburant: 'essence',
        puissance: '',
        statut: 'disponible',
        description: ''
    });

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
        setLoading(true);

        try {
            await api.post('/vehicules', formData);
            setSuccess('Véhicule créé avec succès');
            
            setTimeout(() => {
                navigate('/vehicules');
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
                <h1>Ajouter un Véhicule</h1>
                <Button variant="secondary" onClick={() => navigate('/vehicules')}>
                    <i className="bi bi-arrow-left me-1"></i>
                    Retour
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
                                        placeholder="AA-1232-RB"
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
                                        placeholder="Renault, Peugeot, etc."
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
                                        placeholder="Clio, 308, etc."
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
                                        placeholder="0"
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
                                        placeholder="Rouge, Bleu, etc."
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
                                        placeholder="90, 120, etc."
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
                                placeholder="Informations supplémentaires sur le véhicule..."
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/vehicules')}
                            >
                                Annuler
                            </Button>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={loading}
                                className="px-5"
                            >
                                {loading ? 'Création en cours...' : 'Créer le véhicule'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default VehiculeCreate;