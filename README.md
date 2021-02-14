# Orderbook demo Application

## Assumptions

- asks prices and bids prices are equal, I therefore merge the two
- quantity and size is used interchangeably

## Brief

Subscribes to a Websocket(wss://www.cryptofacilities.com/ws/v1) to fetch orderbook data.

What it does: Show real time delta price data in the form of table: price, size, total

Only show delta for which the size is greater than 0;

## Features:

- A table showing data for all the deltas
- Each row shows:
  - the position or level of delta (arbitrary. this helps with visualization)
  - The latest delta price value. (Either bid or ask)
  - The latest delta size value. (Either bid or ask)
  - The latest total size value
- Handles connection errors

## Commands

Run the below commands in the root directory of the project in order:

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `yarn install` | Installs libraries associated to the project |
| `yarn start`   | Run the APP on localhost:3000                |
