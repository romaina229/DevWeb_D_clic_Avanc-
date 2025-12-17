import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ClientList = () => {
    const [clients, setClients] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/clients");
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:3001/clients/${id}`); // Suppression du client par son id
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 text-secondary">
            <div className="table table-striped">
                <div className="container mb-4">
                    <h1 className="text-center mb-4 mt-4">Liste des clients</h1>
                    <div className="text-center mb-3">
                        <Link to="/clients/create" className="btn btn-success"> Ajouter 
                        </Link>
                    </div>
                </div>
                <table className="table table-bordered table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Opérations</th>
                        </tr>
                    </thead >
                    <tbody style={{ color: '#6c757d' }}>
                        {clients.map((client) => (
                                <tr key={client.id}>
                                    <td>
                                        <Link to={`/clients/${client.id}`}>{client.nom}</Link>
                                    </td>
                                    <td>{client.adresse || client.adress}</td>
                                    <td>{client.tel}</td>
                                    <td>
                                        <Link to={`/clients/${client.id}/update`}>
                                            <button className="btn btn-primary">Modifier</button>
                                        </Link>
                                        <button onClick={() => handleDelete(client.id)} className="btn btn-danger"> Supprimer</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );     
}

export default ClientList;