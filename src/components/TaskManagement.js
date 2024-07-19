import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    const fetchTasksAndMembers = async () => {
      try {
        const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
        setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const membersSnapshot = await getDocs(collection(firestore, 'members'));
        setMembers(membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTasksAndMembers();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true); // Inicia o carregamento
    try {
      await addDoc(collection(firestore, 'tasks'), {
        description,
        deadline,
        priority,
        assignedTo,
      });
      setMessage('Task added successfully!');
      // Atualiza a lista de tarefas
      const tasksSnapshot = await getDocs(collection(firestore, 'tasks'));
      setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      // Limpa os campos do formulário
      setDescription('');
      setDeadline('');
      setPriority('');
      setAssignedTo('');
    } catch (error) {
      setMessage('Failed to add task. Please try again.');
      console.error('Error adding task:', error.message);
    } finally {
      setIsLoading(false); // Termina o carregamento
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Management</h2>
        <form onSubmit={handleAddTask} className="space-y-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="Priority"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Assign to</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={isLoading} // Desabilita o botão enquanto carrega
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
        {message && <p className={`mt-4 text-center ${message.startsWith('Task added successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        <ul className="mt-6 space-y-2 w-full">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 border border-gray-200 rounded">
              {task.description} - {task.deadline} - {task.priority} - {task.assignedTo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManagement;
