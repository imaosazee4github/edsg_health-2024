import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // uuid for generating unique passcodes
import './PasscodeManagement.css';
import Header from '../components/Header';

function PasscodeManagement() {
  const [passcodes, setPasscodes] = useState([]);
  const [userName, setUserName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [editId, setEditId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editPasscode, setEditPasscode] = useState('');

  // Generate a random passcode
  const generatePasscode = () => uuidv4().slice(0, 8); // Shortened UUID for simplicity

  // Handle new passcode addition
  const addPasscode = () => {
    if (!userName || (!passcode && editId === null)) return;
    
    const newPasscode = passcode || generatePasscode();
    const newEntry = {
      id: uuidv4(),
      userName,
      passcode: newPasscode,
      attempts: 0,
    };

    setPasscodes([...passcodes, newEntry]);
    setUserName('');
    setPasscode('');
  };

  // Handle deletion of a passcode
  const deletePasscode = (id) => {
    setPasscodes(passcodes.filter(entry => entry.id !== id));
  };

  // Enable edit mode for a passcode
  const enableEdit = (entry) => {
    setEditId(entry.id);
    setEditUserName(entry.userName);
    setEditPasscode(entry.passcode);
  };

  // Save edits to the passcode
  const saveEdit = () => {
    setPasscodes(
      passcodes.map(entry =>
        entry.id === editId
          ? { ...entry, userName: editUserName, passcode: editPasscode }
          : entry
      )
    );
    setEditId(null);
    setEditUserName('');
    setEditPasscode('');
  };

  return (
    <>
    <Header />
    <div className="passcode-management">
      <h2>Passcode Management</h2>

      {/* Form for adding new passcodes */}
      <div className="passcode-form">
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Passcode or Generate"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
        <button onClick={() => setPasscode(generatePasscode())}>Generate Passcode</button>
        <button onClick={addPasscode}>Add Passcode</button>
      </div>

      {/* Display the list of passcodes */}
      <ul className="passcode-list">
        {passcodes.map((entry) => (
          <li key={entry.id} className="passcode-item">
            {editId === entry.id ? (
              <>
                <input
                  type="text"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                />
                <input
                  type="text"
                  value={editPasscode}
                  onChange={(e) => setEditPasscode(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span><strong>User: </strong> {entry.userName}</span>
                <span><strong>Passcode: </strong> {entry.passcode}</span>
                <button onClick={() => enableEdit(entry)} className='edit'>Edit</button>
                <button onClick={() => deletePasscode(entry.id)} className='delete'>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default PasscodeManagement;
