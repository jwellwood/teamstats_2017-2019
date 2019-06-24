const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  root: { flexGrow: 1 },
  appBar: {},
  bigAvatar: {
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
    margin: '10px 0',
    width: 32,
    height: 32,
  },
  signedIn: {
    textAlign: 'right',
    paddingRight: '10px',
    fontSize: '0.8rem',
    margin: 0,
    backgroundColor: theme.palette.primary.dark,
  },
  email: { color: theme.palette.secondary.light },
  logout: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: '20px',
    marginLeft: '15px',
    marginRight: '15px',
  },
});

export default styles;
