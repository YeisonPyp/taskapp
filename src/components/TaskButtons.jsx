import { useState } from 'react';
import PropTypes from 'prop-types';

function TaskButtons({ task, onEdit, onDelete, onToggleComplete }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Estados para manejar los datos del formulario de edición
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [tags, setTags] = useState(task.tags);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      dueDate,
      priority,
      tags,
    };
    onEdit(updatedTask);
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setConfirmDeleteOpen(false);
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
    // Replace alert with a more appropriate notification method
    console.log('Has completado la tarea');
  };

  return (
    <div className="flex space-x-2">
      {/* Botón de Editar */}
      <button onClick={handleEdit} className="bg-yellow-500 text-white px-2 py-1 rounded">
        Editar
      </button>

      {/* Modal de Edición */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Editar tarea</h2>
            {/* Formulario para editar la tarea */}
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label>Título:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border"
                  required
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border"
                />
              </div>
              <div>
                <label>Fecha de Vencimiento:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border"
                />
              </div>
              <div>
                <label>Prioridad:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border"
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
              <div>
                <label>Etiquetas (separadas por comas):</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-2 border"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Guardar cambios
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Botón de Eliminar */}
      <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">
        Eliminar
      </button>

      {/* Mensaje de confirmación para Eliminar */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">¿Estás seguro de que deseas eliminar esta tarea?</h2>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirmDelete}
              >
                Sí, eliminar
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setConfirmDeleteOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón de Completar */}
      <button onClick={handleToggleComplete} className="bg-green-500 text-white px-2 py-1 rounded">
        Completar
      </button>
    </div>
  );
}
TaskButtons.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskButtons;
