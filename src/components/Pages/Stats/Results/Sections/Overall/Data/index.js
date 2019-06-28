const columns = [
  {
    Header: '',
    accessor: 'name',
    style: { fontWeight: 'bold', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase' },
    sortable: false,
    resizable: false,
  },
  {
    Header: '',
    accessor: 'value',
    width: 60,
    style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
    sortable: false,
    resizable: false,
  },
];

export default columns;
