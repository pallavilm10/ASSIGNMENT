// TaskTable.js
import React, { useState } from 'react';
import { useTable } from 'react-table';
import NewDataTaskPanel from './NewDataTaskPanel'; // Import the NewDataTaskPanel component
// import './TaskTable.css'; // Import the CSS file

const TaskTable = () => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [showNewTaskPanel, setShowNewTaskPanel] = useState(false);
  const [data, setData] = useState(
    Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      taskName: 'Finish Contributor List',
      assignedTo: 'username',
      startDate: `2023-01-${index + 1}`,
      endDate: `2023-01-${index + 5}`,
      tags: `Tags, Tags`,
      followers: `Username`,
      description: `Finish Contributor List`,
    }))
  );

  const startInlineEdit = (taskId, currentTaskName) => {
    setEditTaskId(taskId);
    setNewTaskName(currentTaskName);
  };

  const handleEdit = (taskId) => {
    startInlineEdit(taskId, data.find((task) => task.id === taskId)?.taskName || '');
  };

  const handleDone = () => {
    // Implement your logic to update the task name
    console.log(`Update task name for ID ${editTaskId} to ${newTaskName}`);
    setEditTaskId(null);
    setNewTaskName('');
  };

  const handleNewTaskSubmit = (newTaskData) => {
    setData([...data, newTaskData]);
    setShowNewTaskPanel(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'NO.', accessor: 'id' },
      { Header: 'Task name', accessor: 'taskName' },
      { Header: 'Assigned to', accessor: 'assignedTo' },
      { Header: 'Start date', accessor: 'startDate' },
      { Header: 'End date', accessor: 'endDate' },
      {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ cell: { value } }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {value.split(',').map((tag, index) => (
              <React.Fragment key={index}>
                <button
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: '14px',
                    padding: '5px',
                    marginRight: '5px',
                  }}
                >
                  {tag}
                </button>
                {index < value.split(',').length - 1 && <div className="cut-mark" />}
              </React.Fragment>
            ))}
          </div>
        ),
      },
      { Header: 'Followers', accessor: 'followers' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div>
            {editTaskId === row.original.id ? (
              <>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Enter new task name"
                />
                <button
                  onClick={() => handleDone()}
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: '14px',
                    padding: '5px',
                    marginLeft: '5px',
                  }}
                >
                  Done
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEdit(row.original.id)}
                style={{
                  color: 'black',
                  fontSize: '14px',
                  padding: '8px',
                  marginRight: '4px',
                }}
              >
                Edit
              </button>
            )}
          </div>
        ),
      },
    ],
    [editTaskId, newTaskName]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div style={{ margin: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '25px' }}>
        <div>
          <h4 style={{ margin: '10px' }}>Task Table</h4>
        </div>
        <div>
          <button
            onClick={() => setShowNewTaskPanel(true)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontSize: '16px',
              padding: '10px',
              marginRight: '25px',
            }}
          >
            Enter New Data
          </button>
        </div>
      </div>

      {showNewTaskPanel && (
        <NewDataTaskPanel onSubmit={handleNewTaskSubmit} onClose={() => setShowNewTaskPanel(false)} />
      )}

      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%', margin: '15px' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2' }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ border: '1px solid black', padding: '8px' }}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                    {cell.column.id === 'tags' ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {cell.value.split(',').map((tag, index) => (
                          <React.Fragment key={index}>
                            <button
                              style={{
                                backgroundColor: 'grey',
                                color: 'white',
                                fontSize: '14px',
                                padding: '5px',
                                marginRight: '5px',
                              }}
                            >
                              {tag}
                            </button>
                            {index < cell.value.split(',').length - 1 && <div className="cut-mark" />}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
