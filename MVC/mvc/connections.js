const mongoose = require("mongoose");

async function connectmongodb(url) {
  return mongoose.connect(url, { dbName: "project-1" });
}

module.exports = { connectmongodb };
