var util = require('util'),
    colors = require('colors');

module.exports = {
    line: function() {
        console.log('');
    },
    title: function() {
        var message = util.format.apply(null, arguments).toUpperCase().bold;
        console.log(message);
    },
    command: function(command, description) {
        console.log(command + ' -- ' + description);
    },
    log: function() {
        var message = util.format.apply(null, arguments);
        console.log(message);
    },
    info: function() {
        var message = util.format.apply(null, arguments).grey;
        console.log(message);
    },
    error: function(){
        var message = util.format.apply(null, arguments);
        console.error(message.red);
    }
};
