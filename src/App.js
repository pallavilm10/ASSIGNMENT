import React from 'react';
import Navbar from './componenets/Navbar';
import TaskTable from './componenets/Tasktable';
// import ErrorBoundary from './componenets/ErrorBoundary';

export default function App() {
  return (
    <div>
      <Navbar />
      
        <TaskTable />
    </div>
  );
}
