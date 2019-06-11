const styles = theme => ({
  main: {
    textDecoration: 'none',
    borderLeft: '3px solid',
    cursor: 'pointer',
  },
  dateBar: {
    fontSize: '12px',
    padding: '0px 0px 0px 5px ',
    backgroundColor: '#444',
    borderRadius: '2px 2px 0px 0px',
  },
  matchTypeBar: {
    fontSize: '12px',
    padding: '0 5px',
    backgroundColor: '#333',
  },
  resultMarker: { width: '39px' },
  avatar: {
    margin: 5,
    width: 20,
    height: 20,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#111',
  },
  date: { color: 'white', margin: 5 },
  matchType: { marginBottom: 2 },
  forfeit: { fontSize: '10px', padding: '0 2px', margin: '0 auto', color: '#666' },
  iconButton: { width: '20px', height: '20px' },
  editButton: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: '15px',
  },
});

export default styles;
