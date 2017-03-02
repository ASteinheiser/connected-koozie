# Connected Koozie

Strap a Tiny Tile to any koozie and make it a smart koozie! Using the built in accelerometer data, Meshblu, and machine learning, the smart koozie will let you know when you have taken a sip of your drink. This could be used for IoT drinking games, personal health, etc.

## Usage

#### Machine Learning
- Run trainer.js to start sending your accelerometer values to Meshblu. Press [Enter] to send current values with gesture flag 'false'. Type any key, then [Enter] to send values with gesture flag 'true'.

- Run createDataSet.js to create a json file containing your accelerometer values as such: `node createDataSet.js > trainingSet.json`

- To generate a prediction model, use node-svm as such: `node-svm train trainingSet.json predictionModel.json`

#### Connector
- Run connector.js to send messages to Meshblu when you take a sip from your smart koozie! The connector utilizes the generated predictionModel.json file from machine-learning to determine what counts as a sip.
