// src/components/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../../services/api';

function Dashboard() {
    const [stats, setStats] = useState({
        techniciens: 0,
        vehicules: 0,
        reparations: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Exemple: Récupérer les statistiques depuis votre API Laravel
            const [techRes, vehRes, repRes] = await Promise.all([
                api.get('/techniciens/count'),
                api.get('/vehicules/count'),
                api.get('/reparations/count')
            ]);
            
            setStats({
                techniciens: techRes.data.count,
                vehicules: vehRes.data.count,
                reparations: repRes.data.count
            });
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Tableau de Bord Administrateur</h1>
            <Row>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Techniciens</Card.Title>
                            <Card.Text className="display-4">{stats.techniciens}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Véhicules</Card.Title>
                            <Card.Text className="display-4">{stats.vehicules}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Réparations</Card.Title>
                            <Card.Text className="display-4">{stats.reparations}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Ajoutez d'autres widgets selon vos besoins */}
        </Container>
    );
}

export default Dashboard;