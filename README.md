
# Canvas Server

The multiplayer server of [Canvas App](https://github.com/iammateus/canvas-app).

This application uses [Socket.io](https://socket.io/) to provide real-time communication between its clients. This communication enables users to draw collaboratively on an online whiteboard.

## Requeriments

-   [Docker](https://docs.docker.com/)

## Installation

    $ docker-compose up
    
    # test with more than one instance
    $ docker-compose up --scale server=3
    
## Environment variables

|Name| Description |
|--------|--|
|APP_PORT| The port of the Application |
|DB_HOST| The host of the database |
|DB_PORT| The port of the database |
 

## Test

Run all tests

    $ yarn test

Run all with html report

    $ yarn test-with-html-report

Run a specific test

    $ yarn test-search "<describeString> <itString>"

## License

[MIT](https://github.com/iammateus/canvas-server/blob/main/LICENSE)
