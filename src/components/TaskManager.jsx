import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Sidebar from './Sidebar';

function TaskManager() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [activeComponent, setActiveComponent] = useState('taskList');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (task) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.find((t) => t.id === task.id);
      if (taskExists) {
        return prevTasks.map((t) => (t.id === task.id ? task : t));
      }
      return [...prevTasks, task];
    });
    setActiveComponent('taskList');
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setActiveComponent('taskForm');
  };

  return (
    <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-grow p-6">
        {activeComponent === 'taskForm' && (
          <TaskForm onSave={handleSaveTask} task={editingTask} />
        )}
        {activeComponent === 'taskList' && (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        {/* {activeComponent === 'taskStats' && <TaskStats tasks={tasks} />} */}
      </div>
    </div>
  );
}

export default TaskManager;
