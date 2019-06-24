import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Components
import Container from '../../layout/hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import BoxContainer from '../../layout/hoc/BoxContainer';
import AboutList from './Lists/AboutList';
import Version from './Footer/Version';
// Other
import { listItemsMain, listItemsAdvanced } from './Data';
// styles
import styles from './styles';

const About = props => {
  const { classes } = props;
  return (
    <Container>
      <PageHeader title="About" link="/" />
      <BoxContainer>
        <div className={classes.root}>
          <Typography variant="body1" className={classes.title}>
            Main features
          </Typography>
          <AboutList listItems={listItemsMain} icon="done-outline" />
          <Typography variant="body1" className={classes.title}>
            Advanced features
          </Typography>
          <Typography variant="caption" className={classes.title}>
            (for registered users)
          </Typography>
          <AboutList listItems={listItemsAdvanced} icon="star" />
          <Version />
        </div>
      </BoxContainer>
    </Container>
  );
};

About.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(About);
