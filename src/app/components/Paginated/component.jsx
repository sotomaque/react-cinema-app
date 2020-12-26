import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Paginated = ({ currentPage, paginate, totalPages }) => {
  const [page, setPage] = React.useState();
  const [totalPageNumber, setTotalPageNumber] = React.useState();

  React.useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
       {page} - {totalPageNumber}
      </span>
      <button
        className="paginate-button"
        onClick={() => paginate('prev')}
      >
        Prev
      </button>
      <button
        className="paginate-button"
        onClick={() => paginate('next')}
      >
        Next
      </button>
    </>
  );
};

Paginated.propTypes = {
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Paginated;
