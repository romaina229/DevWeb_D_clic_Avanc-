// UpdateClient.jsx 
import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const UpdateClient = () => { 
    const { id } = useParams(); //récupération de l'id du client à modifier
    const navigate = useNavigate();
    const [client, setClient] = useState({ nom: '', adresse: '', tel: '' });
 
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/clients/${id}`);
                setClient(response.data); //récupération infos du client à modifier
            } catch (error) {
                console.error(error);
            }
        };
        fetchClient();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/clients/${id}`, client);
            navigate("/clients"); //redirection vers la liste des clients après mise à jour
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class="d-flex justify-content-center align-items-center vh-100 text-secondary">
            <div className="container mt-4 center">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title mb-3">Mettre à jour le client</h3>
                                <div className="mb-3">
                                    <label className="form-label"><strong>Nom du client</strong></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={client.nom}
                                        onChange={(e) => setClient({ ...client, nom: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><strong>Adresse</strong></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={client.adresse}
                                        onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><strong>Téléphone</strong></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={client.tel}
                                        onChange={(e) => setClient({ ...client, tel: e.target.value })}
                                    />
                                </div>
                                <div className="text-end">
                                    <button className="btn btn-primary" type="button" onClick={handleUpdate}>Mettre à jour</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>    
    );
};

export default UpdateClient;