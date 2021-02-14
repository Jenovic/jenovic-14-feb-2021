### What would you add to your solution if you had more time?

- I would write more test cases to see how the app behaves to changing data and data frequency
- I'd add a graph for better visualization. It is hard to understand how the prices are changing (trends)
  When looking at a table

### What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

- I would reduce the time complexity of data processing
  Filtering data takes the total time complexity of the app to n^3. This could be an issue for thousands of requests
- I'd potentially add register a service worker for offline capabilities in case the API goes down
- In terms of functionality, I'll also consider sorting the prices from high to low and vice versa
- Have the app web traffic go through a CDN

### What was the most useful feature that was added to the latest version of your chosen language?

### Please include a snippet of code that shows how you've used it.

React Hooks. Hooks enables function components to not only implement state, but also add other React features such as lifecycle methods, optionally without the need to convert the component to a class component.

Below I've rewritten my `DashBoard` class component into a function component using useState and useEffect hooks:

```
  import React, { useEffect, useState } from 'react';
  import * as bulma from 'reactbulma';
  import DeltaList from './DeltaList';
  import Loader from './Loader';

  const orderbookUrl = 'wss://www.cryptofacilities.com/ws/v1';

  function Dashboard() {
  const [deltas, setDeltas] = useState({});
  const [connectionError, setError] = useState(false);


  useEffect(() => {
    const connection = new WebSocket(orderbookUrl);
    connection.onopen = () => {
    connection.send(
    JSON.stringify({
    event: 'subscribe',
    feed: 'book_ui_1',
    product_ids: ['PI_XBTUSD'],
    }),
    );
    };

    // Handle connection close
    connection.onclose = () => {
      setError(true);
    };

    // Handle message from API
    connection.onmessage = ({ data }) => {
      // this.props.hideSpinner();
      let prices = JSON.parse(data);
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

      let new_deltas = deltas;

      let total = 0;

      if (filteredPrices !== undefined) {
        filteredPrices.map((delta, index) => {
          total = total + Number(delta[1]);
          if (deltas[delta]) {
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
      setDeltas(new_deltas);
    };

}, []);

  return (
  <div className="container">
  <div className="columns">
  <DeltaList deltas={deltas} />
  </div>
  </div>
  );
}
```

### How would you track down a performance issue in production? Have you ever had to do this?

- By using server logs if any exist (depending on the type of issue)
- By using browser dev tools.
  - Look at the console errors and warnings
  - The network tab, to see wether request are executing successfully (By looking at the HTTP response code)
- Compare different environments (dev/staging vs production) and see if anything is different

### Can you describe common security concerns to consider for a frontend developer?

- cross-site scripting XSS attacks that compromises the interactions between users and app.
  - These can be remediated by the usage of libraries, packages or frameworks that handles security automatically like React, etc...
- Up to date dependencies. It's imperative to make sure that no package within the node_modules folder can introduce vulnerabilities in the app.
- Third-party scripts (like tag managers, etc...) can also be a source of security weakness.
- Confidential data exposure: either through logging to the console or return in JSON format.

### How would you improve the Kraken API that you just used?

- I would potentially introduce a small delay to the data being broadcasted by the socket.
  - Just because it's a bit hard to read for the human eye. However, this can be done on the front end side.
  - That said, I do understand that this is a real time application and data should be sent in real time
