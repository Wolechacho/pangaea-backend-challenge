'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mockHttp = require('nock');
const pubSub = require('./pubsub');
const nock = require('nock');

const pubsub = new pubSub();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let subscribedUrls = new Map();

app.post('/publish/:topic', (req, res) => {
    if (subscribedUrls.has(req.params.topic)) {
        let url = subscribedUrls.get(req.params.topic);
        let data = {
            'url': url,
            'topic': req.params.topic,
            'data': req.body
        };
        pubsub.publish(req.params.topic, data);
        res.send("Message Forwarded to the subscribed Url");
    }
});

app.post('/subscribe/:topic', (req, res) => {
    if (!(subscribedUrls.has(req.params.topic))) {
        subscribedUrls.set(req.params.topic, req.body.url);

        pubsub.subscribe(req.params.topic, (payload) => {
            console.log(payload);

            //Mock the http request in case the url is non-existent
            nock(payload.url).post('/', { topic: payload.topic, data: payload.data }).reply(200);
        });
        res.send("Topic has been subscribed ...");
    } else {
        res.send("Topic Already subscribed to .Try another topic");
    }
});



//Set Header Response 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

let port = process.env.Port || 8000;
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


process.on('unhandledRejection', (reason, p) => {
    console.log("unhandledRejection", reason);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("uncaughtException", error);
    throw error;
});