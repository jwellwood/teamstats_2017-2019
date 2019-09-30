import React from 'react';
import Typography from '@material-ui/core/Typography';

const Version = () => (
  <div>
    <Typography variant="body2">
      <strong>
        If you notice a mistake in your stats, contact website admin
      </strong>
    </Typography>

    <hr />
    <Typography variant="caption" align="center" style={{ color: '#ccc' }}>
      You can view the source code for this project here:{' '}
      <a href="https://github.com/jwellwood/teamstats">
        <i className="fab fa-github" />
      </a>
    </Typography>
    <Typography variant="caption" align="center">
      Version: 3.3.1
    </Typography>
    <Typography variant="caption" align="center">
      jwellwood 2019
    </Typography>
  </div>
);

export default Version;
