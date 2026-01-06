import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'technician'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validation
        if (formData.password !== formData.password_confirmation) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);

        try {
            // 1. CSRF token
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });

            // 2. Inscription
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Registration successful:', response.data);
            
            // Auto-login après inscription
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            // Redirection
            navigate(response.data.user.role === 'admin' ? '/dashboard' : '/technicien');

        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Erreur d\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Créer un compte</h2>
                
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Nom complet</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            className="form-control"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Rôle</label>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="technician">Technicien</option>
                            <option value="admin">Administrateur</option>
                            <option value="driver">Chauffeur</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Inscription en cours...' : 'Créer le compte'}
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <a href="/login" className="text-muted">
                        Déjà un compte ? Se connecter
                    </a>
                </div>
            </div>

            <style>{`
                .register-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f5f5f5;
                    padding: 20px;
                }
                .register-card {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 450px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }
                .form-control {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                }
                select.form-control {
                    height: 42px;
                }
                .btn {
                    width: 100%;
                    padding: 12px;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .alert {
                    padding: 12px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .alert-danger {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .text-muted {
                    color: #6c757d;
                    text-decoration: none;
                }
                .text-muted:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default Register;