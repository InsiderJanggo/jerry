const {MessageEmbed} = require('discord.js');

module.exports={
    name: 'ping',
    category: 'info',
    description: 'Check the ping of Azunyan',
    aliases: ['p','botping'],
    usage: '',
    run: async(jerry, message, args)=>{
        try {
            const m = await message.channel.send("<:dankjerry_full:793876080997433364>")
            const pingg = m.createdTimestamp - message.createdTimestamp;
            const pi = new MessageEmbed()
            if(pingg >= 0 && pingg < 500) {
            pi.setColor(0x2f3136)
            pi.addField("<:dankjerry_full:793876080997433364>  I responded to you in", `**${pingg}ms**`)
            return m.edit("\t", pi);
            }
            else if(pingg > 500 && pingg <= 10000) {
            pi.setColor(0x2f3136)
            pi.addField("<:dankjerry_full:793876080997433364>  I responded to you in", `**${pingg}ms**`)
            return m.edit("\t", pi);
            }

        } catch (err) {
            return message.channel.send(console.log(err));
        }
    }
}