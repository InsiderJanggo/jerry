const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "Show User Avatar",
    usage: "[mention]",
    category: "info",
    run: async(jerry, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let embed = new MessageEmbed()
        .setColor("#964B00")
        .setDescription(`Download: [PNG](${user.displayAvatarURL({ dynamic:true })}?size=2048)`)
        .setTitle(`${user.username} Avatar`)
        .setImage(`${user.displayAvatarURL({ dynamic:true })}?size=2048`)
        .setTimestamp()
        
         message.channel.send(embed)
    },
};