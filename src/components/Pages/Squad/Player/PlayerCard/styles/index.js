const styles = theme => ({
  avatar: { margin: '5px' },
  playerNumber: {
    width: 22,
    height: 22,
    color: '#fafafa',
    margin: '3px',
    fontFamily: 'Anton',
  },
  numAvatar: {
    width: 19,
    height: 19,
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
    background: theme.palette.primary.light,
    width: '100%',
  },
  captain: {
    position: 'absolute',
    margin: '0px 20px',
    width: 12,
    height: 12,
    borderRadius: '50%',
    fontFamily: 'Righteous',
    fontSize: '0.6rem',
    background: '#fff',
    color: theme.palette.primary.dark,
  },
  statsKey: { fontSize: '10px', color: '#bbb' },
  extras: {
    padding: '2px',
    fontSize: '11px',
    borderTop: '1px solid #333',
    marginTop: '3px',
  },
});

export default styles;
