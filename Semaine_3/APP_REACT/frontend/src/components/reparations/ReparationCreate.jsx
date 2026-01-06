import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

function ReparationCreate() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [vehicules, setVehicules] = useState([]);

    // Récupérer l'ID du véhicule depuis les query params si présent
    const queryParams = new URLSearchParams(location.search);
    const vehiculeIdFromQuery = queryParams.get('vehicule_id');

    const [formData, setFormData] = useState({
        vehicule_id: vehiculeIdFromQuery || '',
        type: '',
        description: '',
        date_debut: new Date().toISOString().split('T')[0],
        date_fin_prevue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        cout_estime: '',
        cout_reel: '',
        statut: 'en_attente',
        notes: ''
    });

    useEffect(() => {
        fetchVehicules();
    }, []);

    const fetchVehicules = async () => {
        try {
            const response = await api.get('/vehicules');
            setVehicules(response.data);
        } catch (err) {
            console.error('Erreur lors du chargement des véhicules:', err);
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
        setLoading(true);

        // Validation des dates
        if (new Date(formData.date_fin_prevue) < new Date(formData.date_debut)) {
            setError('La date de fin ne peut pas être antérieure à la date de début');
            setLoading(false);
            return;
        }

        try {
            await api.post('/reparations', formData);
            setSuccess('Réparation créée avec succès');
            
            setTimeout(() => {
                navigate('/reparations');
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
                <h1>Nouvelle Réparation</h1>
                <Button variant="secondary" onClick={() => navigate('/reparations')}>
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
                                    <Form.Label>Véhicule *</Form.Label>
                                    <Form.Select
                                        name="vehicule_id"
                                        value={formData.vehicule_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un véhicule</option>
                                        {vehicules.map(vehicule => (
                                            <option key={vehicule.id} value={vehicule.id}>
                                                {vehicule.immatriculation} - {vehicule.marque} {vehicule.modele}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type de réparation *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        placeholder="Révision, Réparation moteur, Carrosserie, etc."
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date de début *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_debut"
                                        value={formData.date_debut}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date de fin prévue *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_fin_prevue"
                                        value={formData.date_fin_prevue}
                                        onChange={handleChange}
                                        required
                                        min={formData.date_debut}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Coût estimé (F cfa)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="cout_estime"
                                        min="0"
                                        step="0.01"
                                        value={formData.cout_estime}
                                        onChange={handleChange}
                                        placeholder="0.00"
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
                                        <option value="en_attente">En attente</option>
                                        <option value="en_cours">En cours</option>
                                        <option value="termine">Terminé</option>
                                        <option value="annule">Annulé</option>
                                    </Form.Select>
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
                                placeholder="Décrivez la réparation à effectuer..."
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Notes supplémentaires</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Notes internes..."
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/reparations')}
                            >
                                Annuler
                            </Button>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                disabled={loading}
                                className="px-5"
                            >
                                {loading ? 'Création en cours...' : 'Créer la réparation'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ReparationCreate;