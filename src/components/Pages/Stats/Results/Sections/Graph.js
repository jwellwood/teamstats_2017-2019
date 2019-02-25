import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

let id = 0;
function createData(title, value, color) {
  id += 1;
  return { id, title, value, color };
}

const Graph = props => {
  const { data, percentages } = props;
  const { win, draw, lose } = percentages;

  const listItems = [createData('Win', win), createData('Draw', draw), createData('Lose', lose)];

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Paper
            style={{
              padding: '5px',
              width: '100%',
              maxWidth: '300px',
              margin: 'auto',
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '13px',
            }}
          >
            <Grid container direction="column" alignContent="center" justify="center">
              {listItems.map(item => (
                <Grid
                  key={item.id}
                  container
                  direction="row"
                  alignContent="center"
                  justify="space-between"
                >
                  <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {item.title}
                  </div>
                  <div>
                    {item.value}
                    <span style={{ color: '#ccc', fontSize: '9px' }}>%</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5} md={3} style={{ textAlign: 'center', padding: '10px' }}>
          <Pie data={data} options={{ legend: { display: false } }} />
        </Grid>
      </Grid>
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.shape({}).isRequired,
  percentages: PropTypes.shape({}).isRequired,
};

export default Graph;
