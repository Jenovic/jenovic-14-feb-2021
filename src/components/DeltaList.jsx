import React from 'react';
import DeltaRow from './DeltaRow';

const DeltaList = (props) => {
  return (
    <div className="card column is-one-third" id="stocks_list">
      <div className="card-header">
        <div className="card-header-title">XBT/USD Futures orderbook</div>
      </div>
      <div className="card-content">
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Price</th>
              <th>Size</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.deltas).map((delta_name, index) => {
              let current_delta = props.deltas[delta_name];

              return (
                <DeltaRow
                  key={index}
                  delta_name={delta_name}
                  delta_data={current_delta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeltaList;
