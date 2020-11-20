# Pangaea-Backend-Challenge

This app focuses on an a miniature publish-subscribe system that allows to forward http request to the subscribed URL

### Installation

The Application was built using javascript as the programming language and node.js as the backend framework on a windows Machine.

Pangaea-Backend-Challenge requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd pangaea-backend-challenge
$ npm install --save
$ node server.js
```

### How to test using curl

Open your favorite Terminal and run these commands.

Subscribe:

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"url\":\"http://localhost:8000/event\"}" http://localhost:8000/subscribe/topic1
```

Publish:

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"message\": \"hello\"}" http://localhost:8000/publish/topic1
```

## License

MIT
