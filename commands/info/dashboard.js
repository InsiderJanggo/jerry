  const {
    DOMAIN,
    HEXCODE
} = process.env;
const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "dashboard",
    aliases: ["panel"],
    description: "Redirect user to bot dashboard/panel",
    usage: "",
    category: "info",
    run: async(jerry, message, args) => {
        let e = new MessageEmbed()
        .setTitle("Jerry Dashboard:")
        .setDescription(`${DOMAIN}`)
        .setColor(HEXCODE)
        .setTimestamp(new Date())
        message.channel.send({embed: e});
    },
};