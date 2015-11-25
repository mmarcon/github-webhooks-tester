#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    uuid = require('node-uuid'),
    crypto = require('crypto'),
    logger = require('./lib/logger');

var defaults = {
    e: 'http://localhost:3000'
};

function header(){
    logger.line();
    logger.title('Github Webhook Tester');
    logger.line();
}

function footer(){
    logger.line();
}

function help(){
    logger.title('Commands');
    logger.command('list', 'lists all the available events');
    logger.command('send <command>', 'sends event to webhook');
    logger.line();
    logger.title('Options');
    logger.command('-e', 'set the endpoint, defaults to ' + defaults.e);
}

function list(){
    var events = path.join(__dirname, 'events');
    fs.readdir(events, function(err, files){
        if(err) {
            logger.error('Events directory not found');
            return;
        }
        logger.title('Supported events');
        files.map(function(f){
            logger.log(path.parse(f).name);
        });
    });
}

function send(endpoint, secret, event){
    if(!event) {
        return help();
    }
    try {
        var eventJson = require('./events/' + event), headers = {};
        headers['X-Github-Event'] = event;
        headers['X-Github-Delivery'] = uuid.v4();
        if(secret) {
            hmac = crypto.createHmac('sha1', secret);
            hmac.update(JSON.stringify(eventJson));
            headers['X-Hub-Signature'] = hmac.digest('hex');
        }

        logger.info('Sending %s event to %s', event, endpoint);
        request({
            uri: endpoint,
            method: 'POST',
            json: true,
            body: eventJson,
            headers: headers
        }, function(error, response, body){
            if(error) {
                return logger.error('Error %s', JSON.stringify(error));
            }
            logger.info('Status code: %d', response.statusCode);
        });
    } catch(e) {
        console.log(e);
        logger.error('Event %s is not supported', event);
    }
}

var availableCommands = {
    help: help,
    list: list,
    send: send
};

var command = argv._.shift(),
    args = argv._;

args.unshift(argv.s); //secret
args.unshift(argv.e || defaults.e); //endpoint

header();

if(availableCommands[command]) {
    availableCommands[command].apply(null, args);
    footer();
    return;
}
help();
footer();
