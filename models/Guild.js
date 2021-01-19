const {Schema, model} = require("mongoose");

const guildSchema = Schema({
    guildID: String,
    userID: String,
    money: { 
        type: Number, 
        default: 0 
    },
    level: { 
        type: Number, 
        default: 0 
    },
    xp: { 
        type: Number, 
        default: 0 
    },
    messages: { 
        type: Number, 
        default: 0 
    },
    warn: { 
        type: Number, 
        default: 0 
    },
    bio: { 
        type: String, 
        default: `jerry bio [text]` 
    },
    _time: { 
        type: Number, 
        default: 0 
    } 
});

module.exports = model("Guild", guildSchema);