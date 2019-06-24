const styles = theme => ({
  root: { padding: '0px', margin: '0px auto', height: '46px' },
  avatar: { margin: '3px' },
  playerNumber: {
    fontSize: '13px',
    color: '#fafafa',
    margin: '3px',
    fontFamily: 'Anton',
    width: '15px',
  },
  numAvatar: {
    width: 19,
    height: 19,
    borderRadius: '5px',
    padding: '5px',
    margin: '3px auto',
    fontWeight: 'bold',
    fontSize: 14,
    background: theme.palette.primary.light,
  },
  name: {
    margin: '5px',
    padding: '3px',
    color: 'white',
    fontFamily: 'Righteous',
    textAlign: 'left',
    background: theme.palette.primary.light,
  },
  captain: {
    margin: '3px',
    fontFamily: 'Righteous',
    fontSize: '9px',
    color: '#333',
  },
  statsKey: { fontSize: '8px', color: '#bbb' },
  extras: {
    padding: '2px',
    fontSize: '11px',
    borderTop: '1px solid #333',
    marginTop: '3px',
  },
});

export default styles;
