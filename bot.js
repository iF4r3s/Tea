const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `=`;

client.login(process.env.Tea);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}\n Users: ${client.users.size}`);
client.user.setGame(`Tea System.`, "https://twitch.tv/teacommunity");
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


client.on('message', async (message) => {
  if(message.content.startsWith(`${prefix}apply`)) {
    await message.channel.send("** ما اسمك ومن وين وكم عمرك؟**").then(e => {
    let filter = m => m.author.id === message.author.id
    let lan = '';
    let md = '';
    let br = '';
    let chaLan = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
      .then(collected => {
        lan = collected.first().content
        collected.first().delete()
        e.delete();
        message.channel.send('** ما خبرتك كأداري؟**').then(m => {
        let chaMd = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
          .then(co => {
            md = co.first().content
            co.first().delete()
            m.delete();
            message.channel.send('**كم مدة تفاعلك**').then(ms => {
            let br = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
              .then(col => {
                br = col.first().content
                col.first().delete()
                ms.delete()
                message.channel.send('جاري التقديم ..').then(b => {
                setTimeout(() => { 
                  b.edit(`**تم التقديم وسيتم الرد فـ اقرب وقت**`)
                },2000);
                var gg = message.guild.channels.find('name', 'applications')
                if(!gg) return;
                if(gg) {
                  gg.send({
                      embed : new Discord.RichEmbed()
                      .setDescrtiption(`اسمك | كم عمرك | من وين | الوقت عندك الحين؟ \n**${lan}**\nهل لديك خبره كإداري من قبل؟\n**${md}**\nكم مده تفاعلك يومياً؟\n**${br}**`)
                      .setFooter(` `)
                      .setTimestamp()
                    });
                  } 
                })
              })
            })
          })
        })
      })
    })
  }
})


client.on('message',async message => {
  let mention = message.mentions.members.first();
  let Room = client.channels.get('517010356007075870');
  if(message.content.startsWith(`${prefix}accept`)) {
  if(message.guild.id !== '489717264686252042') return;
  if (!message.member.hasPermission("ADMINSTRATION")) return message.reply("**:x: | This Command is Just for adminstration!**").then(msg => msg.delete(5000));
  if(!mention) return message.reply("منشن شخص");
  Room.send(`**:white_check_mark: | User : ${mention} \nAccepted and get __Staff__ Role**`);
  mention.addRole(message.guild.roles.find("name", "» Staff"));
  mention.addRole(message.guild.roles.find("name", "• Support •"));
  mention.addRole(message.guild.roles.find("name", "Support Team"));
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
