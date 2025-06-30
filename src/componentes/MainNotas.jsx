import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa'; // Importar el ícono de tacho de basura, el ícono de editar y el ícono de guardar
import '../assets/scss/_03-Componentes/_MainNotas.scss';

const MainNotas = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNote, setEditedNote] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleAddNote = () => {
    if (newNote.trim() && notes.length < 30) {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNewNote('');
    }
  };

  const handleEditNote = (index) => {
    setEditingIndex(index);
    setEditedNote(notes[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedNotes = notes.map((note, i) => (i === index ? editedNote : note));
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditingIndex(null);
    setEditedNote('');
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleClearList = () => {
    setNotes([]);
    localStorage.removeItem('notes');
  };

  return (
    <div className="mainNotas-container">
      <div className="mainNotas">
        <h2>Notas</h2>
        <div className="mainNotas__input">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escribe una nota"
          />
          <button onClick={handleAddNote}>Agregar Nota</button>
        </div>
        <ul className="mainNotas__list">
          {notes.map((note, index) => (
            <li key={index} className="mainNotas__listItem">
              {index + 1}. {editingIndex === index ? (
                <div className="mainNotas__listItem-edit">
                  <input
                    type="text"
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className="mainNotas__listItem-input"
                  />
                  <button onClick={() => handleSaveEdit(index)}>
                    <FaSave />
                  </button>
                </div>
              ) : (
                note
              )}
              <div className="mainNotas__listItem-buttons">
                {editingIndex === index ? null : (
                  <>
                    <button onClick={() => handleEditNote(index)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteNote(index)}>
                      <FaTrashAlt />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mainNotas__actions">
          <button onClick={handleClearList}>Borrar Lista Completa</button>
        </div>
      </div>
    </div>
  );
};

export default MainNotas;
