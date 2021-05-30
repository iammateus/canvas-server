# Canvas Server

Multiplayer server of [Canvas App](https://github.com/iammateus/Canvas).

This application uses WebSockets to provide real-time communication between its clients. This communication enables users to draw collaboratively in a canvas.

## Requeriments

-   [Docker](https://docs.docker.com/)

## Installation

    $ docker-compose up

## Test

Run all tests

    $ yarn test

Run all with html report

    $ yarn test-with-html-report

Run a specific test

    $ yarn test-search "<describeString> <itString>"

## License

[MIT](https://github.com/iammateus/canvas-server/blob/main/LICENSE)
