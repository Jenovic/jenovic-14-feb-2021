import React from 'react';
import * as bulma from 'reactbulma';
import DeltaList from './DeltaList';
import Loader from './Loader';

const orderbookUrl = 'wss://www.cryptofacilities.com/ws/v1';
class Dashboard extends React.Component {
  state = {
    deltas: {},
    connectionError: false,
  };

  componentDidMount = () => {
    // Establish connection to orderbook API endpoint
    this.connection = new WebSocket(orderbookUrl);
    this.connection.onopen = () => {
      this.connection.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: ['PI_XBTUSD'],
        }),
      );
    };

    // Handle message from API
    this.connection.onmessage = this.saveNewStockValues;

    // Handle connection close
    this.connection.onclose = () => {
      this.setState({ connectionError: true });
    };
  };

  saveNewStockValues = (event) => {
    this.props.hideSpinner();
    let prices = JSON.parse(event.data);
    const filteredPrices = [];
    let bidPrices = [];
    let askPrices = [];

    // handle cases of empty bid prices
    if (prices.bids !== undefined && prices.bids.length !== 0) {
      bidPrices = prices.bids;
    }

    // handle cases of empty asks prices
    if (prices.asks !== undefined && prices.asks.length !== 0) {
      askPrices = prices.asks;
    }

    bidPrices.concat(askPrices).map((price) => {
      if (price[1] !== 0) {
        filteredPrices.push(price);
      }
    });

    let new_deltas = this.state.deltas;

    let total = 0;

    if (filteredPrices !== undefined) {
      filteredPrices.map((delta, index) => {
        total = total + Number(delta[1]);
        if (this.state.deltas[delta]) {
          new_deltas[index].current_price = Number(delta[0]);
          new_deltas[index].current_size = Number(delta[1]);
          new_deltas[index].current_total = total;
          new_deltas[index].history.push({
            price: Number(delta[0]),
            value: Number(delta[1]),
            total: total,
          });
        } else {
          total = total + Number(delta[1]);
          new_deltas[index] = {
            current_price: delta[0],
            current_size: delta[1],
            current_total: total,
            history: [
              {
                price: Number(delta[0]),
                value: Number(delta[1]),
                total: total,
              },
            ],
          };
        }
      });
    }
    this.setState({
      deltas: new_deltas,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="columns">
          <DeltaList deltas={this.state.deltas} />
        </div>
        <div className={this.props.showSpinner ? 'modal is-active' : 'modal'}>
          <div className="modal-background"></div>
          <div className="modal-content">
            <Loader connectionError={this.state.connectionError} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
