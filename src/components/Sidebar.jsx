import PropTypes from 'prop-types';

function Sidebar({ setActiveComponent }) {
  return (
    <div className="w-64 bg-blue-600 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Gestor de Tareas</h2>
      <ul>
        <li>
          <button
            onClick={() => setActiveComponent('taskForm')}
            className="block text-left w-full py-2 px-4 rounded hover:bg-blue-700"
          >
            Agregar Tarea
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('taskList')}
            className="block text-left w-full py-2 px-4 rounded hover:bg-blue-700"
          >
            Ver Tareas
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveComponent('taskStats')}
            className="block text-left w-full py-2 px-4 rounded hover:bg-blue-700"
          >
            Ver Estadísticas
          </button>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};

export default Sidebar;
