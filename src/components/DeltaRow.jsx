import React from 'react';

class DeltaRow extends React.Component {
  render() {
    return (
      <tr id={this.props.delta_name}>
        <td>{this.props.delta_name.toUpperCase()}</td>
        <td>{this.props.delta_data.current_price.toFixed(2)}</td>
        <td>{this.props.delta_data.current_size.toFixed(2)}</td>
        <td>{this.props.delta_data.current_total.toFixed(2)}</td>
      </tr>
    );
  }
}

export default DeltaRow;
