// NewDataTaskPanel.js
import React, { useState } from 'react';
import './NewDataTaskPanel.css'; // Import the CSS file

const NewDataTaskPanel = ({ onSubmit, onClose }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [followers, setFollowers] = useState('');

  const handleSubmit = () => {
    // Validate input if needed
    // ...

    // Call the onSubmit callback with the new task data
    onSubmit({
      taskName: newTaskName,
      endDate,
      description,
      assignedTo,
      followers,
      startDate: new Date().toISOString().split('T')[0], // Current date
    });

    // Reset form and close the panel
    setNewTaskName('');
    setEndDate('');
    setDescription('');
    setAssignedTo('');
    setFollowers('');
    onClose();
  };

  return (
    <div className="side-panel"> {/* Add a class for styling */}
      <h3>Enter New Task Data</h3>
      <label>
        Task Name:
        <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Assigned To:
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      </label>
      <label>
        Followers:
        <input type="text" value={followers} onChange={(e) => setFollowers(e.target.value)} />
      </label>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewDataTaskPanel;
