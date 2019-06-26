import React from 'react';

const columns = [
  {
    Header: <i className="far fa-check-square" />,
    accessor: 'name',
    style: {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '12px',
      textTransform: 'uppercase',
      background: '#ddd',
      color: '#333',
      borderBottom: '1px solid #666',
    },
    sortable: false,
    resizable: false,
  },
  {
    Header: <i className="fas fa-futbol" />,
    accessor: 'goals',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: <i className="fas fa-key" />,
    accessor: 'assists',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: '',
    accessor: 'mvp',
    width: 30,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
];
export default columns;
