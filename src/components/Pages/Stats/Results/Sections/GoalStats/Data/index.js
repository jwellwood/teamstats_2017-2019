const columns = [
  {
    Header: '',
    accessor: 'name',
    style: { fontWeight: 'bold', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Opponent',
    accessor: 'date',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Date',
    accessor: 'arrow',
    width: 30,
    style: { color: '#9a0007', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
  {
    Header: 'Result',
    accessor: 'away',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
];

export default columns;
