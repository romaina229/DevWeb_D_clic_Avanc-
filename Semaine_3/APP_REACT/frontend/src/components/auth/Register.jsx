import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'technicien'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

        // Validation côté client
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Veuillez entrer une adresse email valide');
            return;
        }

        setLoading(true);

        try {
            // Préparer les données pour l'API
            const userData = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                role: formData.role
            };

            console.log('Données envoyées:', userData);

            const data = await authService.register(userData);
            
            // Dispatch l'action Redux
            dispatch(loginSuccess({
                user: data.user,
                token: data.token
            }));
            
            // Redirection selon le rôle
            const user = data.user;
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/techniciens');
            }
            
        } catch (err) {
            console.error('Erreur d\'inscription complète:', err);
            
            // Gestion détaillée des erreurs
            if (err.response) {
                // Le serveur a répondu avec un statut d'erreur
                if (err.response.status === 422) {
                    // Erreurs de validation Laravel
                    const errors = err.response.data.errors;
                    if (errors) {
                        const firstError = Object.values(errors)[0][0];
                        setError(firstError || 'Erreur de validation');
                    } else {
                        setError(err.response.data.message || 'Erreur de validation');
                    }
                } else if (err.response.status === 400) {
                    setError(err.response.data.message || 'Requête invalide');
                } else if (err.response.status === 500) {
                    setError('Erreur serveur. Veuillez réessayer plus tard.');
                } else {
                    setError(err.response.data.message || `Erreur ${err.response.status}`);
                }
            } else if (err.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                setError('Impossible de se connecter au serveur. Vérifiez votre connexion.');
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                setError('Une erreur est survenue : ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '500px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Créer un compte</h2>
                    
                    {error && (
                        <Alert variant="danger">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                        </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nom complet *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Romain GUEKPON"
                                        disabled={loading}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="romain@exemple.com"
                                disabled={loading}
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mot de passe *</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Minimum 8 caractères"
                                        disabled={loading}
                                    />
                                    <Form.Text className="text-muted">
                                        Minimum 8 caractères
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmer le mot de passe *</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Répétez le mot de passe"
                                        disabled={loading}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Rôle *</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="technicien">Technicien</option>
                                <option value="admin">Administrateur</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                Sélectionnez votre rôle dans l'application
                            </Form.Text>
                        </Form.Group>

                        <Button 
                            type="submit" 
                            disabled={loading} 
                            variant="primary" 
                            className="w-100 mb-3"
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Inscription en cours...
                                </>
                            ) : 'S\'inscrire'}
                        </Button>

                        <div className="text-center">
                            <p className="mb-2">Déjà un compte ?</p>
                            <Link 
                                to="/login" 
                                className="btn btn-outline-secondary w-100"
                                disabled={loading}
                            >
                                Se connecter
                            </Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Register;