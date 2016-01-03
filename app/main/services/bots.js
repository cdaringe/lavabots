var spark = require('spark');
var config = require('config');
var cycle = require('cycle');
var _ = require('lodash');

module.exports = {
    _deviceCache: {},

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
        return { ok: true };
        
        // var device = this._deviceCache(opts.name);
        // if (!device) {
        //     return cb(new ReferenceError('no deviced named "' + opts.name + '"'));
        // }
        // device.callFunction(opts.function, opts.arg, function(err, rslt) {
        //     cb(err, rslt);
        // });
    },

    list: function(cb) {
        console.log('fetching bots...');
        spark.listDevices(function(err, rslt) {
            rslt = cycle.decycle(rslt);
            console.log('fetched bots', rslt);
            _.assign(this._deviceCache, _.indexBy(rslt, 'attributes.name'))
            cb(err, rslt);
        }.bind(this));
    }
};
