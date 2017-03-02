# Connected Koozie

Strap a Tiny Tile to any koozie and make it a smart koozie! Using the built in accelerometer data, Meshblu, and a nueral network(of some kind), the smart koozie will let you know when you have taken a sip of your drink. This could be used for IoT drinking games, personal health, etc.

## Usage

- Run trainer.js to start sending your accelerometer values to Meshblu. Press [Enter] to send current values with gesture flag 'false'. Type any key, then [Enter] to send values with gesture flag 'true'.

- Run createDataSet.js to create a json file containing your accelerometer values as such: `node createDataSet.js > trainingSet.json`

- To generate a prediction model, use node-svm as such: `node-svm train trainingSet.json predictionModel.json`
