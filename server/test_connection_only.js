const mongoose = require('mongoose');
const uri = "mongodb+srv://essente:atppRsJgyqd6UoGe@moh.ib5zv.mongodb.net/?appName=moh";
const fs = require('fs');

const log = (msg) => {
  console.log(msg);
  fs.appendFileSync('connection_test_v2.log', msg + '\n');
};

log("Starting connection test...");
mongoose.connect(uri)
    .then(() => {
        log("SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch(err => {
        log("FAILURE: " + err.message);
        process.exit(1);
    });
