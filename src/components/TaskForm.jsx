import { useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ onSave, task }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState(task?.priority || 'media');
  const [tags, setTags] = useState(task?.tags || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: task?.id || Date.now(),
      title,
      description,
      dueDate,
      priority,
      tags: tags.split(',').map(tag => tag.trim()),
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date(),
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('media');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
}
TaskForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    tags: PropTypes.string,
    completed: PropTypes.bool,
    createdAt: PropTypes.instanceOf(Date),
  }),
};

export default TaskForm;
