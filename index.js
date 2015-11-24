#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    path = require('path'),
    logger = require('./lib/logger');

function help(){}

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

switch(argv._[0]){
    case 'list':
        list();
        break;
    default:
        help();
}
