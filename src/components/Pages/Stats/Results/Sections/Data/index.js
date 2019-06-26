const columns = [
  {
    Header: '',
    accessor: 'statName',
    style: { fontWeight: 'bold', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Home',
    accessor: 'home',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: '',
    accessor: 'arrow',
    width: 30,
    style: { color: '#9a0007', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Away',
    accessor: 'away',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
];

export default columns;
