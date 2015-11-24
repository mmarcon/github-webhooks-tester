#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    path = require('path'),
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

function send(endpoint, event){
    if(!event) {
        return help();
    }
    logger.info('Sending %s event to %s', event, endpoint);
}

var availableCommands = {
    help: help,
    list: list,
    send: send
};

var command = argv._.shift(),
    arguments = argv._;

arguments.unshift(argv.e || defaults.e);

header();

if(availableCommands[command]) {
    availableCommands[command].apply(null, arguments);
    footer();
    return;
}
help();
footer();
