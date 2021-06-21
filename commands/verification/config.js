const Discord = require('discord.js');

module.exports = {
	name: 'config',
	run: async (client, message, args, db) => {
		if (!message.channel.permissionsFor(message.author).has('MANAGE_GUILD'))
			return message.channel.send(
				':x: | **You dont have permissions to use this Command!**'
			);
		let options = ['warningchannel', 'logs', 'punishment', 'role', 'show', 'toggle'];
		function check(opt, array) {
			return array.some(x => x.toLowerCase() === opt.toLowerCase());
		}
		if (!args[0]) {
			return message.channel.send(
				`:x: | **Specify an option, The options are - ${options.join(', ')}**`
			);
		}
		if (!check(args[0], options)) {
			return message.channel.send(
				`:x: | **The only options are ${options.join(', ')}**`
			);
		}
		let channel = message.mentions.channels.first();
		switch (args[0]) {
			case 'warningchannel':
				if (!channel) {
					return message.channel.send(':x: | **Specify the channel**');
				}
				db.set(`warningchannel_${message.guild.id}`, channel.id);
				return message.channel.send('**The Warning Channel has been set**');
				break;
			case 'logs':
				if (!channel) {
					return message.channel.send(':x: | **Specify the channel**');
				}
				db.set(`logs_${message.guild.id}`, channel.id);
				return message.channel.send('**The logs channel has been set**');
				break;
			case 'role':
				let role =
					message.mentions.roles.first() ||
					message.guild.roles.cache.get(args[1]);
				if (!role) {
					return message.channel.send(':x: | **Specify the role**');
				}
				db.set(`role_${message.guild.id}`, role.id);
				return message.channel.send('**The verification rooe has been set**');
				break;
			case 'show':
				let warningChan =
					message.guild.channels.cache.get(
						db.get(`warningchannel_${message.guild.id}`)
					) || 'None';
				let logsChan =
					message.guild.channels.cache.get(
						db.get(`logs_${message.guild.id}`)
					) || 'None';
				let verificationRole =
					message.guild.roles.cache.get(db.get(`role_${message.guild.id}`)) ||
					'None';
				let punish = db.get(`punishment_${message.guild.id}`) || 'None';
				let embed = new Discord.MessageEmbed()
					.setTitle('Configuration')
					.setDescription(
						'The configuration for this server is displayed below'
					)
					.addField('Punishment', punish)
					.addField('Warning Channel', warningChan)
					.addField('logs Channel', logsChan)
					.addField('Verification Role', verificationRole)
					.setColor('RANDOM')
					.setFooter(
						message.guild.name + ' | made by legendjs#0001',
						message.guild.iconURL({ dynamic: true })
					);
				return message.channel.send({ embed: embed });
				break;
			case 'punishment':
				const punishment = args[1].toLowerCase().trim();
				const punishments = ['kick', 'ban'];
				if (!punishment)
					return message.channel.send('Please enter a punishment');
				if (!punishments.includes(punishment))
					return message.channel.send(
						`The **punishment** argument must be one of these:\n${punishments
							.map(x => `**${x}**`)
							.join(', ')}`
					);
				db.set(`punishment_${message.guild.id}`, punishment);
				return message.channel.send(
					`The punishment for **${
						message.guild.name
					}** has been set to: **${punishment}**`
				);
				break;
		}
	}
};
