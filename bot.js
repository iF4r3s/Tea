const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$";

client.login(process.env.CB);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username} \n Prefix ${prefix}`)
client.user.setStatus('online');
client.user.setActivity(`Critical Network`, { type : "LISTENING" })
});


client.on("message", message => {
  var user = message.mentions.members.first();
  var log = message.guild.channels.find("name", "log");
  var reason = message.content.split(" ").slice(2).join(' ');
  if(!user) return message.reply(`Mention someone`);
  if(!log) return message.reply(`Create text channel named #log`);
  if(reason.length < 1) return message.reply(`Set a reason`);
  if(message.content === `${prefix}warn`){
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
