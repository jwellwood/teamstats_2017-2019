import React from 'react';
// MUI
import { withStyles } from '@material-ui/core/styles';
// Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';

const styles = theme => ({
  tableHeader: {
    backgroundColor: '#333',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  noHeader: { height: '-10px', display: 'hidden' },
});

const TableWrapper = props => {
  const { classes, data, columns, noHeader } = props;

  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        showPagination={false}
        minRows={1}
        className="-striped"
        ThComponent={noHeader}
        getTheadThProps={() => ({ className: classes.tableHeader })}
        getTdProps={() => ({
          style: {
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        })}
      />
    </div>
  );
};

TableWrapper.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  // eslint-disable-next-line react/require-default-props
  noHeader: PropTypes.func,
};

export default withStyles(styles)(TableWrapper);
