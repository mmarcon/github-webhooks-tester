var util = require('util'),
    colors = require('colors');

module.exports = {
    title: function() {
        var message = util.format.apply(null, arguments).toUpperCase().bold;
        console.log(message);
    },
    log: function() {
        var message = util.format.apply(null, arguments);
        console.log(message);
    },
    error: function(){
        var message = util.format.apply(null, arguments);
        console.error(message.red);
    }
};
