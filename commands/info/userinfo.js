const {MessageEmbed, User} = require('discord.js');
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    name: "user",
    description: "Return User Information",
    usage: "[mention]",
    aliases: ["orang","manusia","userinfo","infoorang"],
    category: "user",
    run: async(jerry,message,args) => {
         var permissions = [];
         var acknowledgements = 'None';
         const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.author;
         //const user = message.author;
        
        
        if(message.member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
    
        if(message.member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
    
        if(message.member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Manage Messages");
    }
    
    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Manage Channels");
    }
    
    if(message.member.hasPermission("MENTION_EVERYONE")){
        permissions.push("Mention Everyone");
    }

    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Manage Nicknames");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Manage Roles");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Manage Webhooks");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Manage Emojis");
    }

    if(permissions.length == 0){
        permissions.push("No Key Permissions Found");
    }

    if(member.user.id == message.guild.ownerID){
        acknowledgements = 'Server Owner';
    }
        //const roles = member.roles.map(role => role.toString());
        //const color = member.roles.find(role => role.name.charAt(0) === '#');
        //member.createdAt.toDateString()
        //member.joinedAt.toDateString()
        let userico = member.user.displayAvatarURL({dynamic: true});
        const embed = new MessageEmbed()
            .setTitle(`${member.user.username}`)
            .setColor('#964B00')
            .addField('Username', member.user.username, true)
            //.addField('Nickname', member.username, true)
            .setThumbnail(userico)
            .addField('ID', member.id, true)
            .addField('Account Created', `${moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Joined Server',`${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField("Permissions: ", `${permissions.join(', ')}`, true)
            .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "No Roles"}`, true)
            .addField("Acknowledgements: ", `${acknowledgements}`, true);
        
        message.channel.send(embed);
    },
};