const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            unique: true,
            required: true,
        },
        redirectUrl: {
            type: String,
            required: true,
        },
        visitHistory: [{ timeStamp: { type: Number } }],
    },
    { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);
module.exports = Url;
