import React from 'react';

const Loader = (props) => {
  if (props.connectionError) {
    return (
      <div className="is-medium">
        <span className="has-text-danger">orderbook currently closed </span>
        <br />
        (Come back later? :-))
      </div>
    );
  } else {
    return (
      <div className="tag is-large is-success">
        <span className="loader"> &nbsp;</span>
        &nbsp; &nbsp; Fetching some prices...
      </div>
    );
  }
};

export default Loader;
