const styles = theme => ({
  container: { margin: '30px auto' },
  button: {
    margin: '10px auto',
    background: '#ddd',
    height: '50px',
    width: '50px',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
  buttonText: {
    textTransform: 'lowercase',
    fontFamily: 'Righteous',
    fontSize: '14px',
    background: theme.palette.primary.dark,
    borderRadius: '2px 2px 12px 2px',
    padding: '5px',
    color: '#fff',
  },
});

export default styles;
