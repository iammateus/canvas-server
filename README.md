
# Canvas Server

The multiplayer server of [Canvas App](https://github.com/iammateus/canvas-app).

This application uses [Socket.io](https://socket.io/) to provide real-time communication between its clients. This communication enables users to draw collaboratively in an online whiteboard.

## Requeriments

-   [Docker](https://docs.docker.com/)

## Installation

    $ docker-compose up
    
## Environment variables

|Name| Description |
|--------|--|
|APP_PORT| The port of the Application |
 

## Test

Run all tests

    $ yarn test

Run all with html report

    $ yarn test-with-html-report

Run a specific test

    $ yarn test-search "<describeString> <itString>"

## License

[MIT](https://github.com/iammateus/canvas-server/blob/main/LICENSE)
