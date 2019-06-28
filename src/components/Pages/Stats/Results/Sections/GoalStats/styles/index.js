const styles = theme => ({
  heading: {
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
    padding: '3px',
  },
  value: { color: theme.palette.secondary.light, fontWeight: 'bold', padding: '3px' },
  teamName: { color: '#333', fontWeight: 'bold', textAlign: 'left' },
  fixture: {
    padding: '4px',
    margin: '2px auto',
    color: '#fff',
    fontSize: '13px',
    textDecoration: 'none',
  },
  firstRow: {
    color: '#ccc',
    fontSize: '12px',
  },
  date: {
    color: '#ccc',
    fontSize: '11px',
  },
});

export default styles;
