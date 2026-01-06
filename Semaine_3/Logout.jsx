import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 1. CSRF token pour la déconnexion
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });

            // 2. Déconnexion
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Nettoyer le localStorage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            
            // Rediriger vers la page de login
            navigate('/login');
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="logout-btn"
        >
            Déconnexion
        </button>
    );
};

// Version avec modal de confirmation
export const LogoutWithConfirm = () => {
    const [showConfirm, setShowConfirm] = React.useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                withCredentials: true
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <>
            <button 
                onClick={() => setShowConfirm(true)}
                className="logout-btn"
            >
                Déconnexion
            </button>

            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirmer la déconnexion</h3>
                        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                        <div className="modal-actions">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="btn-cancel"
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="btn-confirm"
                            >
                                Se déconnecter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .logout-btn {
                    padding: 8px 16px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .logout-btn:hover {
                    background: #c82333;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 400px;
                    width: 90%;
                }
                .modal-content h3 {
                    margin-top: 0;
                    color: #333;
                }
                .modal-content p {
                    margin-bottom: 20px;
                    color: #666;
                }
                .modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }
                .btn-cancel {
                    padding: 8px 16px;
                    background: #6c757d;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .btn-confirm {
                    padding: 8px 16px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
};

export default Logout;