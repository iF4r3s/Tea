const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = `=`;

client.login(process.env.Tea);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}\n Users: ${client.users.size}`);
client.user.setGame(`For Sell.`, "https://twitch.tv/teacommunity");
}); 


client.on("message", message => {

    

    if (message.content.startsWith(prefix + "bc")) {

        
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('**__ليس لديك صلاحيات__**');

        let args = message.content.split(" ").slice(1);
        var argresult = args.join(' ');
        message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
            m.send(`${argresult}\n ${m}`);
        })
        message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'all').size}\` : :twitter_pepe:عدد الاعضاء المستلمين`);
        message.delete();
    }
});
