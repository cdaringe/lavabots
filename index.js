var _ = require('lodash');
var spark = require('spark');
var p = spark.login({accessToken: '26471cbd0524f633e316af4bbd00b5111aaffde8'})
var devicesByName;
var init = function() {
    spark.listDevices()
    .then(function(devices){
        console.log('Devices: ', devices);
        devicesByName = _.indexBy(devices, 'name');
    })
    .then(function() { return spark.getAttributesForAll(); })
    .then(function(data) {
        console.log('attrs:', data);
    })
    .then(function() {
        console.log("spark Devices:", spark.devices);
    });
};

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
process.on('unhandledRejection', function(reason, p) {
  // unhandledRejections.set(p, reason);
  console.log(reason);
});

init();

var toggle;
setInterval(function() {
    toggle = !toggle;
    var lavabot = spark.devices[devicesByName.lavabot.id];
    var magmabot = spark.devices[devicesByName.magmabot.id];
    lavabot.callFunction('led', toggle ? 'on' : 'off');
    magmabot.callFunction('led', !toggle ? 'on' : 'off');
    console.log('toggle?:', toggle.toString());
}, 1000);
