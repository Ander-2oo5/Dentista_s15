import React, { useState } from 'react';
import axios from 'axios';

interface Dentista {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
}

interface DentListProps {
  dentistas: Dentista[];
  updateDentista: (dentista: Dentista) => void;
  deleteDentista: (id: number) => void;
}

const DentList: React.FC<DentListProps> = ({ dentistas, updateDentista, deleteDentista }) => {
  const [editingDentista, setEditingDentista] = useState<Dentista | null>(null);

  const handleDelete = (id: number) => {
    axios.delete(`/clinicadental/dentistas/${id}`)
      .then(() => {
        deleteDentista(id);
      });
  };

  const handleEdit = (dentista: Dentista) => {
    setEditingDentista(dentista);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDentista) {
      axios.put(`/clinicadental/dentistas/${editingDentista.id}`, editingDentista)
        .then(response => {
          updateDentista(response.data);
          setEditingDentista(null);
        });
    }
  };

  return (
    <div>
      <h2>Lista de Dentistas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dentistas.map(dentista => (
            <tr key={dentista.id}>
              <td>{dentista.nombre}</td>
              <td>{dentista.apellido}</td>
              <td>{dentista.especialidad}</td>
              <td>
                <button onClick={() => handleEdit(dentista)}>Editar</button>
                <button className="delete" onClick={() => handleDelete(dentista.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingDentista && (
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={editingDentista.nombre}
              onChange={(e) => setEditingDentista({ ...editingDentista, nombre: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={editingDentista.apellido}
              onChange={(e) => setEditingDentista({ ...editingDentista, apellido: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="especialidad">Especialidad:</label>
            <input
              type="text"
              id="especialidad"
              value={editingDentista.especialidad}
              onChange={(e) => setEditingDentista({ ...editingDentista, especialidad: e.target.value })}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
};

export default DentList;