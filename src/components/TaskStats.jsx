import PropTypes from "prop-types";

function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex sm:flex-row flex-col space-y-2 sm:space-x-2 w-full items-center justify-center">
      <div className="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-blue-300">
        <div className="flex justify-between w-full">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h6"
              />
            </svg>
          </div>
          <div className="flex items-center text-xs px-3 bg-blue-200 text-blue-800 rounded-full">
            {completedPercentage}%
          </div>
        </div>
        <div>
          <div className="font-bold text-5xl">{totalTasks}</div>
          <div className="font-bold text-sm">N° Total de tareas</div>
        </div>
      </div>

      <div className="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-green-300">
        <div className="flex justify-between w-full">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h6"
              />
            </svg>
          </div>
          <div className="flex items-center text-xs px-3 bg-green-200 text-green-800 rounded-full">
            {completedTasks}
          </div>
        </div>
        <div>
          <div className="font-bold text-5xl">{completedTasks}</div>
          <div className="font-bold text-sm">Tareas Completadas</div>
        </div>
      </div>

      <div className="flex flex-wrap flex-row sm:flex-col justify-center items-center w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-yellow-300">
        <div className="flex justify-between w-full">
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h6"
              />
            </svg>
          </div>
          <div className="flex items-center text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full">
            {pendingTasks}
          </div>
        </div>
        <div>
          <div className="font-bold text-5xl">{pendingTasks}</div>
          <div className="font-bold text-sm">Tareas Pendientes</div>
        </div>
      </div>
    </div>
  );
}

TaskStats.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskStats;
