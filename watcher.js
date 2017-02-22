var noble = require('noble');

var serviceUuids = ['19B10000E8F2537E4F6CD104768A1214'];

var allowDuplicates = false;

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

        characteristicX.subscribe(function(error){
          if(error) console.log(error);
        });

        characteristicY.subscribe(function(error){
          if(error) console.log(error);
        });

        characteristicZ.subscribe(function(error){
          if(error) console.log(error);
        });

        characteristicX.on('data', function(data, isNotification) {
          console.log('X: ', data.readUInt8(0));
        });

        characteristicY.on('data', function(data, isNotification) {
          console.log('Y: ', data.readUInt8(0));
        });

        characteristicZ.on('data', function(data, isNotification) {
          console.log('Z: ', data.readUInt8(0));
        });
      });
    });
  });
});
