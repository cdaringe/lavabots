var spark = require('spark');
var config = require('config');
var cycle = require('cycle');
var _ = require('lodash');

module.exports = {
    _deviceCache: {},
    numDOs: 8,

    auth: function(cb) {
        cb = cb || _.noop;
        console.log('attempting to authorize spark...');
        spark.login({ accessToken: config.accessToken })
        .then(function(rslt) {
            console.log('auth result:', rslt);
            cb(null, cycle.decycle(rslt));
        })
        .catch(function(err) {
            console.log('auth err:', err);
            cb(err);
        });
    },

    callCmd: function(opts, cb) {
        var device = this._deviceCache[_.get(opts, 'bot.attributes.name')];
        if (!device) {
            return cb(new ReferenceError('no deviced named "' + opts.name + '"'));
        }
        device.callFunction(opts.cmd, opts.arg ? opts.arg.toString() : null, function(err, rslt) {
            cb(err, rslt);
        });
    },

    getAttributes: function(opts, cb) {
        var device = this._deviceCache[_.get(opts, 'bot.attributes.name')];
        device.getAttributes(function(err, rslt) {
            cb(err, rslt);
        });        
    },

    list: function(cb) {
        console.log('fetching bots...');
        spark.listDevices(function(err, rslt) {
            if (err) return cb(err);
            _.assign(this._deviceCache, _.indexBy(rslt, 'attributes.name'));
            this.setupListeners();
            rslt = cycle.decycle(rslt);
            console.log('fetched bots', rslt);
            cb(err, rslt);
        }.bind(this));
    },
    
    // @TODO register client listeners, and send them to the connected clients!
    
    setupListeners: function() {
        var device;
        for (var key in this._deviceCache) {
            if (this._deviceCache.hasOwnProperty(key)) {
                device = this._deviceCache[key];
                if (!device.listeners) {
                    device.listeners = {
                        doEvents: device.onEvent('digital-out-update', function(data) {
                            console.log("Event digital-out-update: " + data);
                        })
                    }   
                }
            }
        }
    }
};
