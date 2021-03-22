import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle){
        return ;
    }
    const id = Date.now();

    const newTasks: Task[] = [
        ...tasks,
      {
        id,
        title: newTaskTitle,
        isComplete: false
      }
    ];

    process.env.NODE_ENV !== 'test' && localStorage.setItem('@ignite/todo', JSON.stringify(newTasks));
    setTasks(newTasks);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
      const newTasks = tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task);

      process.env.NODE_ENV !== 'test' && localStorage.setItem('@ignite/todo', JSON.stringify(newTasks));
      setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);

    process.env.NODE_ENV !== 'test' && localStorage.setItem('@ignite/todo', JSON.stringify(newTasks));
    setTasks(newTasks);
  }

  useEffect(() => {
    const tasksStorage = localStorage.getItem('@ignite/todo');
    
    if(!tasksStorage){
        return ;
    }

    setTasks(JSON.parse(tasksStorage) as Task[])
  }, [])

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleCreateNewTask()
              }
            }}

            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}