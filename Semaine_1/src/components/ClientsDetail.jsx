//ClientsDetail.jsx 
import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

const ClientsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/clients/${id}`);
                setClient(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClient();
    }, [id]);

    if (!client) return <div className="container mt-4">Loading...</div>;

    return (
        <div class="d-flex justify-content-center align-items-center vh-100 text-secondary">
          <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Détails du client</h2>

                                <div className="mb-3">
                                    <label className="form-label"><strong>Nom</strong></label>
                                    <input className="form-control" value={client.nom} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"><strong>Adresse</strong></label>
                                    <input className="form-control" value={client.adresse} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"><strong>Téléphone</strong></label>
                                    <input className="form-control" value={client.tel} readOnly />
                                </div>

                                <div className="text-center mt-3">
                                    <button className="btn btn-secondary text-center" onClick={() => navigate("/clients")}>Retour à la liste</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
};

export default ClientsDetail;