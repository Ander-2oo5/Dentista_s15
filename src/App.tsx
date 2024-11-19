import React, { useState, useEffect } from 'react';
import DentList from './components/DentList';
import DentForm from './components/DentForm';
import axios from 'axios';
import './App.css';

interface Dentista {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
}

const App: React.FC = () => {
  const [dentistas, setDentistas] = useState<Dentista[]>([]);

  useEffect(() => {
    axios.get('/clinicadental/dentistas')
      .then(response => setDentistas(response.data));
  }, []);

  const addDentista = (dentista: Dentista) => {
    setDentistas([...dentistas, dentista]);
  };

  const updateDentista = (updatedDentista: Dentista) => {
    setDentistas(dentistas.map(dentista => dentista.id === updatedDentista.id ? updatedDentista : dentista));
  };

  const deleteDentista = (id: number) => {
    setDentistas(dentistas.filter(dentista => dentista.id !== id));
  };

  return (
    <div>
      <h1>Clínica Dental</h1>
      <DentForm addDentista={addDentista} />
      <DentList dentistas={dentistas} updateDentista={updateDentista} deleteDentista={deleteDentista} />
    </div>
  );
};

export default App;