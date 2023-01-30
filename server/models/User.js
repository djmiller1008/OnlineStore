const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Schema.Types.Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 32
    }
});

module.exports = mongoose.model("user", UserSchema);

