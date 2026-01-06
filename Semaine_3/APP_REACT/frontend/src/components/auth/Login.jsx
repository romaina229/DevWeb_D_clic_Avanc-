import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Récupérer le token CSRF (si nécessaire)
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });

            // 2. Tentative de connexion
            const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
                email: email.trim().toLowerCase(),
                password: password
            }, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Login successful:', response.data);
            
            // Stocker le token si vous utilisez Sanctum
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            // Redirection selon le rôle
            const user = response.data.user;
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else if (user.role === 'technician') {
                navigate('/technicien');
            } else {
                navigate('/vehicule');
            }

        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Connexion</h2>
                
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        disabled={loading}
                    >
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <a href="/register" className="text-muted">
                        Pas encore de compte ? Créer un compte
                    </a>
                </div>
            </div>

            <style>{`
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f5f5f5;
                    padding: 20px;
                }
                .login-card {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 400px;
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
                .btn {
                    width: 100%;
                    padding: 12px;
                    background: #007bff;
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

export default Login;