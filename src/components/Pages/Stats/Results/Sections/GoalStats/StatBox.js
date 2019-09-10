import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Components
import BoxContainer from '../../../../../layout/hoc/BoxContainer';
// helpers
import { colors } from '../../../../../../assets/styles/colors';
import formatDate from '../../../../../../helpers/date';
import styles from './styles';

const StatBox = props => {
  const { classes, title, data, value } = props;
  console.log(typeof value);
  return (
    <BoxContainer>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ background: '#333' }}
      >
        <Typography variant="caption" className={classes.heading}>
          {title}
        </Typography>
        <Typography className={classes.value}>
          {isFinite(value) || value === 0 ? value : null}
        </Typography>
      </Grid>

      {data.map(item => (
        <div key={Math.random()} className={classes.fixture}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.firstRow}
          >
            <Grid item xs={6} className={classes.teamName}>
              {item.opponentName}
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row" justify="space-between">
                <Grid className={classes.date} item>
                  {formatDate(item.date)}
                </Grid>
                <Grid
                  item
                  style={{
                    fontWeight: 'bold',
                    color:
                      +item.teamScore > +item.opponentScore
                        ? colors.win
                        : colors.lose,
                  }}
                >
                  {item.homeOrAway === 'home'
                    ? item.teamScore
                    : item.opponentScore}{' '}
                  -{' '}
                  {item.homeOrAway === 'away'
                    ? item.teamScore
                    : item.opponentScore}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
    </BoxContainer>
  );
};

StatBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withStyles(styles)(StatBox);
