import React from 'react';
import IconFA from '../../../../../../assets/icons/IconFA';

const columns = [
  {
    Header: <IconFA icon='check-square' size='lg' />,
    accessor: 'name',
    style: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '12px',
      textTransform: 'uppercase',
      background: '#444',
      color: '#fff',
      borderBottom: '1px solid #666',
    },
    sortable: false,
    resizable: false,
  },
  {
    Header: <IconFA icon='futbol' size='lg' />,
    accessor: 'goals',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: true,
    defaultSortDesc: true,
    resizable: false,
  },
  {
    Header: <IconFA icon='adjust' size='lg' />,
    accessor: 'assists',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: true,
    defaultSortDesc: true,
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
