import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientList from './components/ClientsList';
import CreateClient from './components/CreateClient';
import UpdateClient from './components/UpdateClient';
import ClientsDetail from './components/ClientsDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/create" element={<CreateClient />} />
        <Route path="/clients/:id/update" element={<UpdateClient />} />
        <Route path="/clients/:id" element={<ClientsDetail />} />
        <Route path="*" element={<Navigate to="/clients" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 