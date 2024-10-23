//schreibe einen nodejs server

// TODO: noch nicht fertig

const express = require('express');
const app = express();

// Importieren Sie den Couchbase-Client in Ihrer 'server.js'
const couchbase = require('couchbase');

const cluster = new couchbase.Cluster('couchbase://localhost:8091');
const bucket = cluster.openBucket('travel-sample');

app.get('/', (req, res) => {
  res.send('Hallo Welt!');
});

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});