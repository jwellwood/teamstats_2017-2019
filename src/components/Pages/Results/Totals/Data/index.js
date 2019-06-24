const column = (head, access) => ({
  Header: head,
  accessor: access,
  width: 35,
  style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
  sortable: false,
  resizable: false,
});

const columns = [
  column('Pl', 'played'),
  column('W', 'wins'),
  column('D', 'draws'),
  column('L', 'loss'),
  column('GF', 'goalsFor'),
  column('GA', 'goalsAgainst'),
  column('+/-', 'difference'),
  column('PTS', 'points'),
];
export default columns;
