const fs = require('fs');
const mqtt = require('mqtt');
const csvParser = require('csv-parser');
const MeterData = require('./src/models/meter.model');
const config = require('./src/config/config');

const csvFilePath = config.csvpath;
const stream = fs.createReadStream(csvFilePath);

const client = mqtt.connect('mqtt://broker.emqx.io:1883');
const CHUNK_SIZE = 100;

client.on('connect', () => {
    console.log('MQTT Server connected');
    client.subscribe('meter_data_topic');
    simulateClients();
});

client.on('message', async (topic, message) => {
    try {
        const msgObject = JSON.parse(message.toString());
        
        await sendMessage(msgObject.chargePointId, msgObject.payload);
        await MeterData.addMeterData({charge_point_id:msgObject.chargePointId, payload:msgObject.payload})
    } catch (error) {
        console.error('Error parsing MQTT message:', error);
    }
});

function sendMessage(chargePointId, payload) {
    return new Promise((resolve, reject) => {
        client.publish('meter_data_topic', JSON.stringify({ chargePointId, payload }), (err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Sent message for charge point ${chargePointId}`);
                resolve();
            }
        });
    });
}

async function simulateClients() {
    const results = [];

    stream
        .pipe(csvParser())
        .on('data', (row) => {
            results.push(row);
            if (results.length === CHUNK_SIZE) {
                processChunk(results);
                results.length = 0;
            }
        })
        .on('end', () => {
            if (results.length > 0) {
                processChunk(results);
            }
        })
        .on('error', (error) => {
            console.error('Error processing CSV:', error);
        });
}

async function processChunk(chunk) {
    for (const row of chunk) {
        if (row.charge_point_id) {
            await sendMessage(row.charge_point_id, row.payload);
            await new Promise((innerResolve) => setTimeout(innerResolve, 5000));
        }
    }
}
