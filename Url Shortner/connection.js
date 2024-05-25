const mongoose = require("mongoose");

async function connectmongoose(url) {
    try {
        return await mongoose.connect(url);
    } catch (error) {
        console.log("mongodb connection error", error);
    }
}

module.exports = {
    connectmongoose,
};
