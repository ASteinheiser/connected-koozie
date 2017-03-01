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
  console.log('Connected');
});

meshbluFirehose.on('message', function(message) {
  console.log(JSON.stringify(message.data.payload, null, 2));
});
