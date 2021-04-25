import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import styles from '../styles/Home.module.scss';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export default function TaskList() {
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
    <>
      <Head>
        <title>List - todo</title>
      </Head>
      <section className={[styles.task_list, 'container'].join(' ')}>
        <header>
          <h2>Minhas tasks</h2>

          <div className={styles.input_group}>
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
                <div className={task.isComplete ? styles.completed : ''} data-testid="task" >
                  <label className={styles.checkbox_container}>
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className={styles.checkmark}></span>
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
    </>
  )
}