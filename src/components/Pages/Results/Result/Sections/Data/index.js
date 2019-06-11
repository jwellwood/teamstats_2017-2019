const columns = [
  {
    Header: '',
    accessor: 'name',
    style: {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '12px',
      textTransform: 'uppercase',
      background: '#E5E7E9',
    },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Goals',
    accessor: 'goals',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Assists',
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
