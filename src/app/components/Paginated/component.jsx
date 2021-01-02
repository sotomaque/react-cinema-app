import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

import I18n from 'app/locales';
import { LOCALES, PAGINATION_TYPES } from 'app/const';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  }
}));

const Paginated = ({ currentPage, paginate, totalPages }) => {
  const [page, setPage] = React.useState();
  const [totalPageNumber, setTotalPageNumber] = React.useState();
  const classes = useStyles();

  React.useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      {/* PREV BUTTON */}
      <Button
        onClick={() => paginate(PAGINATION_TYPES.PREV)} size="medium"
        style={{ backgroundColor: lightBlue[500], borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}
        className={classes.margin}
        disabled={page === 1}
      >
        <Typography
        color="inherit"
        noWrap
        className={classes.title}>
        {I18n.translate(LOCALES.PREV)}
        </Typography>
      </Button>
      {/* PAGE COUNT */}
      <Typography
        color={'secondary'}
        noWrap
        style={{ alignSelf: 'center' }}>
        {page} - {totalPageNumber}
      </Typography>
      {/* NEXT BUTTON */}
      <Button
        onClick={() => paginate(PAGINATION_TYPES.NEXT)}
        size="medium"
        style={{ backgroundColor: lightBlue[500], borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}
        className={classes.margin}
        disabled={page === totalPages}
        >
        <Typography
          color="inherit"
          noWrap
          className={classes.title}>
          {I18n.translate(LOCALES.NEXT)}
        </Typography>
      </Button>
    </div>
  );
};

Paginated.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Paginated;
