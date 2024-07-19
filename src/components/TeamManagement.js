import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

function TeamManagement() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      const membersSnapshot = await getDocs(collection(firestore, 'members'));
      setMembers(membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'members'), { name, email, role });
      setMessage('Member added successfully!');
      setName('');
      setEmail('');
      setRole('');
      // Update the members list
      const membersSnapshot = await getDocs(collection(firestore, 'members'));
      setMembers(membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      setMessage('Error adding member: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Team Management</h2>
      <form onSubmit={handleAddMember} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Member
        </button>
      </form>
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      <ul className="mt-6 space-y-2">
        {members.map((member) => (
          <li key={member.id} className="p-4 border border-gray-200 rounded">
            {member.name} - {member.email} - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamManagement;
