const {Client, Collection} = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const jerry = new Client();
const {TOKEN, VERSION, PREFIX} = process.env;

const website = require("./website/app");

jerry.commands = new Collection();
jerry.aliases = new Collection();
jerry.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(jerry);
});

jerry.once("ready", () => {
    require("./events/ready")(jerry);
    website.run(jerry);
});

jerry.once("guildCreate", (guild) => {
    jerry.user.setUsername("Jerry");
})

jerry.on("message", (message) => {
    let prefix = PREFIX;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    //if (!message.member) message.member = await message.guild.fetchMember(message);
    
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = jerry.commands.get(cmd);
    if (!command) command = jerry.commands.get(jerry.aliases.get(cmd));

    if (command) 
        command.run(jerry, message, args);
        
    // // if (!cooldowns.has(cmd.name)) {
    // //     cooldowns.set(cmd.name, new Discord.Collection());
    // // }
       
    // const now = Date.now();
    // //const timestamps = cooldowns.get(cmd.name);
    // //const cooldownAmount = (cmd.cooldown || 3) * 1000;

    // if (!timestamps.has(message.author.id)) {
    //     timestamps.set(message.author.id, now);
    //     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // }
    // else {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command. `);
    //     }

    //     timestamps.set(message.author.id, now);
    //     setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // }
    //     try {
    //         command.run(jerry, message, args);
    //     } catch (error) {
    //     console.error(error);
    //     message.reply('there was an error trying to execute the command! Or The Command Doest Exist');
    //     }
});

jerry.login(TOKEN);

module.exports = jerry;