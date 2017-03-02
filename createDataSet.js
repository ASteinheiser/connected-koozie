var meshbluJSON = require('./meshblu.json');
var MeshbluFirehose = require('meshblu-firehose-socket.io');

var meshbluFirehose = new MeshbluFirehose({
  meshbluConfig: {
    hostname: 'meshblu-firehose-socket-io.octoblu.com',
    protocol: 'wss',
    port: 443,
    uuid: meshbluJSON.uuid,
    token: meshbluJSON.token
  }
});

meshbluFirehose.connect(function(error) {
  if (error) console.log(error);
});

meshbluFirehose.on('message', function(message) {
  var pass = 0;
  if (message.data.payload.gesture[0]) pass = 1;

  trainingData = [ message.data.payload.data, pass ];
  console.log(trainingData);
});
