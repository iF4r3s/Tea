const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";

client.login(process.env.CB);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username} \n Prefix ${prefix}`)
client.user.setStatus('online');
client.user.setActivity(`» C'R 100 user`, { type : "LISTENING" })
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  var reason = message.content.split(" ").slice(2).join(' ');
  if(message.content.startsWith(`${prefix}warn`)){
    if(!user) return message.reply(`Mention someone`);   if(!log) return message.reply(`Create text channel named #log`);
    if(reason.length < 1) return message.reply(`Set a reason`);
    if(!message.member.roles.find("name", "Support Team")) return message.reply(`You must have **Support Team** Role`);
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
    if(!user) return message.reply(`Mention someone`);   if(!log) return message.reply(`Create text channel named #log`);
    if(reason.length < 1) return message.reply(`Set a reason`);
    if(!reason.includes(`prntscr.com`)) return message.reply(`Reason must fe **https://prntscr.com** Screen shot!`);
    if(!message.member.roles.find("name", "Support Team")) return message.reply(`You must have **Support Team** Role`);
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
    message.channel.send(`**Reason saved and will review by our staff**`);
      message.delete();
    user.addRole(message.guild.roles.find('name', 'Muted'));
    log.send({embed})
  }
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  if(message.content.startsWith(`${prefix}unmute`)){
    if(!user) return message.reply(`Mention someone`);   if(!log) return message.reply(`Create text channel named #log`);
    if(!message.member.roles.find("name", "Support Team")) return message.reply(`You must have **Support Team** Role`);
    if(!user.roles.find('name', "Muted")) return message.reply(`**:x: | The user is not muted!**`)
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${user.user.username}`, user.avatarURL)
    embed.setThumbnail(user.avatarURL)
    embed.setTitle(`New Unmute!`)
    embed.addField(`For`, `<@${user.id}>`)
    embed.addField(`By`, `<@${message.author.id}>`)
    embed.addField(`In Chat`, `<#${message.channel.id}>`)
    embed.addField(`Reason`, `${reason}`)
    embed.setTimestamp()
    embed.setColor("RED")
    embed.setFooter(" ")
    message.reply(`**Done!**`)
      message.delete();
    user.removeRole(message.guild.roles.find('name', 'Muted'));
    log.send({embed})
  }
});


client.on('message',async message => {
  if(message.content.startsWith(`${prefix}critical`)) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('**:x: | This command is just for adminstration**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return message.reply(`:x: | I don't have right permissions`);
  message.guild.createChannel(`Critical` , 'voice').then(time => {
    time.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
  setInterval(() => {
      time.setName(`C'R » ${message.guild.members.size}`);
 },1000);
  });
  } 
});
