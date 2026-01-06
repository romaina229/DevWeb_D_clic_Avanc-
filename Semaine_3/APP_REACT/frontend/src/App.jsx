import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


// Layout
import Layout from './components/layout/Layout';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Techniciens
import TechniciensList from './components/techniciens/TechnicienList';
import TechnicienShow from './components/techniciens/TechnicienShow';
import TechnicienEdit from './components/techniciens/TechnicienEdit';
import TechnicienCreate from './components/techniciens/TechnicienCreate';

import VehiculesList from './components/vehicules/VehiculeList';
import VehiculeShow from './components/vehicules/VehiculeShow';
import VehiculeEdit from './components/vehicules/VehiculeEdit';
import VehiculeCreate from './components/vehicules/VehiculeCreate';

import ReparationsList from './components/reparations/ReparationList';
import ReparationShow from './components/reparations/ReparationShow';
import ReparationEdit from './components/reparations/ReparationEdit';
import ReparationCreate from './components/reparations/ReparationCreate';


function App() {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <Router>
            {isAuthenticated ? (
                <Layout>
                    <Routes>
                        {/* Routes pour admin */}
                        <Route path="/dashboard" element={
                            <PrivateRoute roles={['admin']}>
                                <Dashboard />
                            </PrivateRoute>
                        } />

                        {/* Routes pour techniciens */}
                        <Route path="/techniciens" element={
                            <PrivateRoute roles={['admin', 'technicien']}>
                                <TechniciensList />
                            </PrivateRoute>
                        } />
                        <Route path="/techniciens/create" element={
                            <PrivateRoute roles={['admin']}>
                                <TechnicienCreate />
                            </PrivateRoute>
                        } />
                        <Route path="/techniciens/:id" element={
                            <PrivateRoute roles={['admin', 'technicien']}>
                                <TechnicienShow />
                            </PrivateRoute>
                        } />
                        <Route path="/techniciens/:id/edit" element={
                            <PrivateRoute roles={['admin', 'technicien']}>
                                <TechnicienEdit />
                            </PrivateRoute>
                        } />

                        <Route path="/vehicules" element={
                        <PrivateRoute roles={['admin']}>
                            <VehiculesList />
                        </PrivateRoute>
                        } />
                        <Route path="/vehicules/create" element={
                            <PrivateRoute roles={['admin']}>
                                <VehiculeCreate />
                            </PrivateRoute>
                        } />
                        <Route path="/vehicules/:id" element={
                            <PrivateRoute roles={['admin']}>
                                <VehiculeShow />
                            </PrivateRoute>
                        } />
                        <Route path="/vehicules/:id/edit" element={
                            <PrivateRoute roles={['admin']}>
                                <VehiculeEdit />
                            </PrivateRoute>
                        } />

                        <Route path="/reparations" element={
                            <PrivateRoute roles={['admin']}>
                                <ReparationsList />
                            </PrivateRoute>
                        } />
                        <Route path="/reparations/create" element={
                            <PrivateRoute roles={['admin']}>
                                <ReparationCreate />
                            </PrivateRoute>
                        } />
                        <Route path="/reparations/:id" element={
                            <PrivateRoute roles={['admin']}>
                                <ReparationShow />
                            </PrivateRoute>
                        } />
                        <Route path="/reparations/:id/edit" element={
                            <PrivateRoute roles={['admin']}>
                                <ReparationEdit />
                            </PrivateRoute>
                        } />

                        {/* Redirection par défaut */}
                        <Route path="/" element={
                            <Navigate to={localStorage.getItem('user') ? 
                                (JSON.parse(localStorage.getItem('user')).role === 'admin' ? 
                                    '/dashboard' : '/techniciens') : 
                                '/login'} 
                            />
                        } />
                    </Routes>
                </Layout>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;