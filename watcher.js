var meshblu = require('meshblu');
var meshbluJSON = require('./meshblu.json');
var noble = require('noble');

var serviceUuids = ['19B10000E8F2537E4F6CD104768A1214'];
var allowDuplicates = false;

var Xdata = {'value': 0};
var Ydata = {'value': 0};
var Zdata = {'value': 0};
var accelData = {'X': 0, 'Y': 0, 'Z': 0};

var MESSAGE_INTERVAL_MS = 250;

function sendMessage(message) {
  console.log('Sending message:', message);
  conn.message({ "devices": ["*"], "payload": message });
}

var conn = new meshblu({ resolveSrv: true, "uuid": meshbluJSON.uuid, "token": meshbluJSON.token });

conn.connect();

conn.on('notReady', function(data) {
  console.log('UUID FAILED AUTHENTICATION!', data);
});

conn.on('ready', function(data) {
  console.log('UUID AUTHENTICATED!', data);
});

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(serviceUuids, allowDuplicates);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(['19B10000E8F2537E4F6CD104768A1214'], function(error, services) {

      var service = services[0];
      console.log('discovered service');

      service.discoverCharacteristics([], function(error, characteristics) {

        var characteristicX = characteristics[0];
        var characteristicY = characteristics[1];
        var characteristicZ = characteristics[2];
        console.log('discovered characteristics');

        characteristicX.subscribe(function(error) {
          if(error) console.log(error);
        });

        characteristicY.subscribe(function(error) {
          if(error) console.log(error);
        });

        characteristicZ.subscribe(function(error) {
          if(error) console.log(error);
        });

        characteristicX.on('data', function(data, isNotification) {
          if(Xdata.value !== data.readUInt8(0)) {
            Xdata.value = data.readUInt8(0);

            setTimeout(sendAccelData(), MESSAGE_INTERVAL_MS);
          }
        });

        characteristicY.on('data', function(data, isNotification) {
          if(Ydata.value !== data.readUInt8(0)) {
            Ydata.value = data.readUInt8(0);

            setTimeout(sendAccelData(), MESSAGE_INTERVAL_MS);
          }
        });

        characteristicZ.on('data', function(data, isNotification) {
          if(Zdata.value !== data.readUInt8(0)) {
            Zdata.value = data.readUInt8(0);

            setTimeout(sendAccelData(), MESSAGE_INTERVAL_MS);
          }
        });

        function sendAccelData() {
          accelData.X = Xdata.value;
          accelData.Y = Ydata.value;
          accelData.Z = Zdata.value;

          sendMessage(accelData);
        }
      });
    });
  });
});
