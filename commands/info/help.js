const { MessageEmbed, Presence } = require('discord.js');
//const Guild = require('../../models/Guild');

module.exports = {
	name: 'help',
	timeout: 5,
	aliases: ['h'],
	category: 'info',
	description: 'Display all commands and descriptions',
	run: async (jerry, message, args) => {
		if (args[0]) {
			const command = await jerry.commands.get(args[0]);

			if (!command) {
				return message.channel.send('Unknown Command: ' + args[0]);
			}

			let embed = new MessageEmbed()
				.setAuthor(command.name, jerry.user.displayAvatarURL())
				.setThumbnail(jerry.user.displayAvatarURL())
				.setColor("#964B00")
				.setFooter(`Prefix: ${process.env.PREFIX}`);

			if (command.description) {
				embed.addField('Description', '```' + command.description + '```');
			} else {
				embed.addField('Description', '```' + 'Not Provided' + '```');
			}

			if (command.aliases) {
				embed.addField(
					'Aliases',
					'```' + `${command.aliases.map((a) => `${a}`).join(', ')}` + '```',
				);
			} else {
				embed.addField('Aliases', '```' + 'None' + '```');
			}

			if (command.usage) {
				embed.addField('Usage', '```' + command.usage + '```');
			} else {
				embed.addField('Usage', '```' + 'Not Provided' + '```');
			}

			if (command.timeout) {
				embed.addField('Cooldown', '```' + command.timeout + '```');
			} else {
				embed.addField('Cooldown', '```' + 'Not Provided' + '```');
			}

			return message.channel.send(embed);
		} else {
			//let guildData = await Guild.findOne({ guildID: message.guild.id });
			const commands = await jerry.commands;

			let emx = new MessageEmbed()
				.setDescription(
					`[Invite link!](https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=8)`,
				)
				.setColor("#964B00")
				.setFooter(`Prefix: ${process.env.PREFIX}`)
				.setThumbnail(jerry.user.displayAvatarURL());

			let com = {};
			for (let comm of commands.array()) {
				let category = comm.category || 'Unknown';
				let name = comm.name;

				if (!com[category]) {
					com[category] = [];
				}
				com[category].push(name);
			}

			for (const [key, value] of Object.entries(com)) {
				let category = key;

				let desc = '`' + value.join('`, `') + '`';

				emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
			}

			return message.channel.send(emx);
		}
	},
};