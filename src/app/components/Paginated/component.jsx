import React from 'react';

import './styles.scss';

const Paginated = () => {
  return (
    <>
      <span className="pageCount">
        1 - 20
      </span>
      <button className="paginate-button disabled">
        Prev
      </button>
      <button className="paginate-button">
        Next
      </button>
    </>
  );
};

export default Paginated;
