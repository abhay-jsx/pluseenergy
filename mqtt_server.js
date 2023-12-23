const mqtt = require('mqtt');
const MeterData = require('./src/models/meter.model');

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://broker.emqx.io:1883`
console.log(connectUrl,clientId)
const client = mqtt.connect(connectUrl);
client.on('connect', () => {
  console.log('MQTT Server connected');
  client.subscribe('meter_data_topic');
});

client.on('message', async(topic, message) => {
  // Handle incoming MQTT messages here
  console.log(topic)
  var msgObject = JSON.parse(message.toString());
//   let payload = JSON.stringify(msgObject,'',2);
    await MeterData.addMeterData(msgObject);
  console.log("message is " + msgObject.payload);
});
