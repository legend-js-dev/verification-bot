const Discord = require('discord.js');

module.exports = {
	name: 'help',
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} | Help`)
			.setDescription(`The commands are listed below`)
			.addField(`Anti Alts`, '`fetch-alts`')
			.addField(`Verification`, '`bypass` | `config` | `verify`')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor('RANDOM')
			.setFooter(client.user.username + ' | made by legendjs#0001', client.user.displayAvatarURL());
		return message.channel.send({ embed: embed });
	}
};
