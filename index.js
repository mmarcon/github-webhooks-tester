#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    path = require('path');

function help(){}

function list(){
    var events = path.join(__dirname, 'events');
    fs.readdir(events, function(err, files){
        if(err) {

            return;
        }
        files.forEach(function(f){
            console.log(path.parse(f).name);
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
