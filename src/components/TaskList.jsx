import { useState } from 'react';
import PropTypes from 'prop-types';
import TaskStats from './TaskStats';
import TaskButtons from './TaskButtons';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || task.priority === filter || (filter === 'completed' && task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div>
        <TaskStats tasks={tasks} />
        </div>
      <div>
        <input
          type="text"
          placeholder="Buscar tareas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border"
        />
      </div>
      <div>
        <label>Filtrar por prioridad: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border">
          <option value="all">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Título</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Vencimiento</th>
            <th className="border p-2">Prioridad</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
            <td className="border p-2">{task.title}</td>
            <td className="border p-2">{task.description}</td>
            <td className="border p-2">{task.dueDate}</td>
            <td className="border p-2">{task.priority}</td>
            <td className="border p-2">
              {task.completed ? 'Completada' : 'Pendiente'}
            </td>
            <td className="border p-2">
              <TaskButtons
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.string,
      completed: PropTypes.bool
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired
};

export default TaskList;
