const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `=`;

client.login(process.env.Tea);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}\n Users: ${client.users.size}`);
client.user.setGame(`Tea System`, "https://twitch.tv/teacommunity");
});


client.on('message', message => {
  if(message.content.startsWith(`${prefix}help`)){
    if(!message.member.roles.find('name', "» Staff")) return message.reply(`**:x: | This bot is just for tea __» Staff__**`);
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${client.user.username}`, client.user.avatarURL)
    embed.addField(`${prefix}warn`, `To give the rule breaker warn`)
    embed.addField(`${prefix}mute`, `To give the role breaker mute after the first warn`)
    embed.addField(`${prefix}unmute`, `If you give a person wrong mute`)
    embed.setTimestamp()
    embed.setColor("AQUA")
    embed.setFooter(`${message.guild.name}`)
    message.channel.send({embed});
  }
});


client.on('message', message => {
  if(message.content.startsWith(`${prefix}bc`)){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**هذا الامر مخصص للإداره**`);
    let args = message.content.split(" ").slice(1).join(" ");
    message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
      m.send(`${args}\n ${m}`);
    })
    message.channel.send(`:white_check_mark: | Done \n Message Boradcasted For \`${message.guild.members.filter(m => m.presence.status !== 'all').size}\``);
    message.delete();
  }
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  var reason = message.content.split(" ").slice(2).join(' ');
  if(message.content.startsWith(`${prefix}warn`)){
    if(!user) return message.reply(`Mention someone`);   
    if(!log) return message.reply(`Create text channel named #log`);
    if(reason.length < 1) return message.reply(`Set a reason`);
    if(!message.member.roles.find("name", "» Staff")) return message.reply(`You must have **» Staff** Role`);
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${user.user.username}`, user.avatarURL)
    embed.setThumbnail(user.avatarURL)
    embed.setTitle(`New Warning!`)
    embed.addField(`For`, `<@${user.id}>`)
    embed.addField(`By`, `<@${message.author.id}>`)
    embed.addField(`In Chat`, `<#${message.channel.id}>`)
    embed.addField(`Reason`, `${reason}`)
    embed.setTimestamp()
    embed.setColor("WHITE")
    embed.setFooter(" ")
    message.channel.send(`${user} ${reason}`);
      message.delete();
    log.send({embed})
  }
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  var reason = message.content.split(" ").slice(2).join(' ');
  if(message.content.startsWith(`${prefix}mute`)){
    if(!user) return message.reply(`Mention someone`);   
    if(!log) return message.reply(`Create text channel named #log`);
    if(reason.length < 1) return message.reply(`Set a reason`);
    if(!reason.includes(`prntscr.com`)) return message.reply(`Reason must fe **https://prntscr.com** Screen shot!`);
    if(!message.member.roles.find("name", "» Staff")) return message.reply(`You must have **» Staff** Role`);
    if(user.roles.find('name', "Muted")) return message.reply(`**:x: | The user is muted before!**`)
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${user.user.username}`, user.avatarURL)
    embed.setThumbnail(user.avatarURL)
    embed.setTitle(`New Mute!`)
    embed.addField(`For`, `<@${user.id}>`)
    embed.addField(`By`, `<@${message.author.id}>`)
    embed.addField(`In Chat`, `<#${message.channel.id}>`)
    embed.addField(`Reason`, `${reason}`)
    embed.setTimestamp()
    embed.setColor("RED")
    embed.setFooter(" ")
    message.reply(`**:white_check_mark: ${user.user.username} Muted! :zipper_mouth: **`);
      message.delete();
    user.addRole(message.guild.roles.find('name', 'Muted'));
    log.send({embed})
  }
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  if(message.content.startsWith(`${prefix}unmute`)){
    if(!user) return message.reply(`Mention someone`);   
    if(!log) return message.reply(`Create text channel named #log`);
    if(!message.member.roles.find("name", "» Staff")) return message.reply(`You must have **» Staff** Role`);
    if(!user.roles.find('name', "Muted")) return message.reply(`**:x: | The user is not muted!**`)
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${user.user.username}`, user.avatarURL)
    embed.setThumbnail(user.avatarURL)
    embed.setTitle(`New Unmute!`)
    embed.addField(`For`, `<@${user.id}>`)
    embed.addField(`By`, `<@${message.author.id}>`)
    embed.addField(`In Chat`, `<#${message.channel.id}>`)
    embed.setTimestamp()
    embed.setColor("RED")
    embed.setFooter(" ")
    message.reply(`**:white_check_mark: ${user.user.username} Unmuted!**`);
      message.delete();
    user.removeRole(message.guild.roles.find('name', 'Muted'));
    log.send({embed})
  }
});
