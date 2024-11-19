import React, { useState } from 'react';
import axios from 'axios';

interface Dentista {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
}

interface DentFormProps {
  addDentista: (dentista: Dentista) => void;
}

const DentForm: React.FC<DentFormProps> = ({ addDentista }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dentista = { nombre, apellido, especialidad };

    axios.post('/clinicadental/dentistas', dentista)
      .then(response => {
        addDentista(response.data);
        setNombre('');
        setApellido('');
        setEspecialidad('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="especialidad">Especialidad:</label>
        <input
          type="text"
          id="especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default DentForm;