import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
        const tasksList = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched tasks:', tasksList); // Adicione este log para depuração
        setTasks(tasksList);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false); // Termina o carregamento
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
        <h3 className="text-xl font-bold mb-4">Tasks</h3>
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <ul className="space-y-2 w-full">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border border-gray-200 rounded">
                <div className="font-bold">{task.description}</div>
                <div>Deadline: {task.deadline}</div>
                <div>Priority: {task.priority}</div>
                <div>Assigned to: {task.assignedTo}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
