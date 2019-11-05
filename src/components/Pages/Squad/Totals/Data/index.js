const columns = [
  {
    Header: '',
    headerStyle: { display: 'hidden' },
    accessor: 'title',
    width: 200,
    style: {
      backgroundColor: '#333',
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    sortable: false,
    resizable: false,
  },
  {
    Header: '',
    accessor: 'totalPlayers',
    width: 40,
    style: { backgroundColor: '#ddd', color: '#333', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
];

export default columns;
