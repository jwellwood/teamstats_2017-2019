import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
// Components
import ProgressCircle from '../../../../layout/Stats/ProgressCircle';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import NumberAvatar from '../../../../layout/Stats/NumberAvatar';
// Helpers
import { colors } from '../../../../../assets/styles/colors';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

// Styling
const styles = () => ({
  progress: { margin: '5px' },
  title: { margin: '0px 16px' },
  circleContainer: { maxWidth: '90px', margin: '10px auto' },
  star: { color: '#D68910' },
});

// Component
const PlayerTargets = props => {
  const { classes, player, playerStats } = props;
  const { apps, goals, assists } = playerStats;
  let percentageApps = (apps * 100) / player.targetApps;
  let percentageGoals = (goals * 100) / player.targetGoals;
  let percentageAssists = (assists * 100) / player.targetAssists;
  if (player.targetApps === 0 || player.targetGoals === 0 || player.targetAssists === 0) {
    percentageApps = '0';
    percentageGoals = '0';
    percentageAssists = '0';
  }
  const playerTargetTotal = +player.targetApps + +player.targetGoals + +player.targetAssists;
  let playerTargetAchieved = apps + goals + assists;
  if (apps === '0') {
    playerTargetAchieved = '0';
  }
  const percentageTotal = (playerTargetAchieved * 100) / playerTargetTotal;

  // Data to map
  let id = 0;
  const createData = (title, percentage, total, target) => {
    id += 1;
    return { id, title, percentage, total, target };
  };

  const listItems = [
    createData('APPS', percentageApps, apps, player.targetApps),
    createData('GOALS', percentageGoals, goals, player.targetGoals),
    createData('ASSISTS', percentageAssists, assists, player.targetAssists),
    createData('TOTAL', percentageTotal, playerTargetAchieved, playerTargetTotal),
  ];

  return (
    <BoxContainer>
      <StatsHeader title="Targets" />

      {listItems.map(item => (
        <div className={classes.title} key={item.id}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={3}>
              <Typography className={classes.title}>{item.title}</Typography>
            </Grid>

            <Grid item xs={3} className={classes.circleContainer}>
              <ProgressCircle percentageCompleted={item.percentage} />
            </Grid>
            <Grid item xs={3} className={classes.progress}>
              <Grid container direction="column" justify="flex-end" alignItems="center">
                <Icon className={classes.star}>
                  {item.percentage >= 100 ? (
                    <i className="material-icons">grade</i>
                  ) : (
                    <i className="material-icons">star_border</i>
                  )}
                </Icon>
                <NumberAvatar background={item.total < item.target ? null : colors.win}>
                  {item.total}
                </NumberAvatar>
                <Typography>{item.target}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </BoxContainer>
  );
};

PlayerTargets.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  playerStats: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PlayerTargets);
