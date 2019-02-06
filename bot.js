const Discord = require("discord.js");
const config = require("./conf.json");
const client = new Discord.Client();

let prefix = config.prefix;

client.on('guildMemberAdd', member => {
  let kanal = member.guild.channels.find("name", "hoşgeldin");
  if(!kanal){
    return member.channel.send("`hoşgeldin` adında bir kanal bulunamadı, !kur komutunu kullanarak olmayan kanalları kurabilirsin.");
  }
  const girisembed = new Discord.RichEmbed()
  .setColor("78d824")
  .addField("Giriş",`Hoşgeldin ${member} <#541319441745575946> kanalına bir göz at`);

  kanal.send(girisembed);
});

client.on('guildMemberRemove', member => {
  let ckanal = member.guild.channels.find("name", "çıkış");
  if(!ckanal){
    return member.channel.send("`çıkış` adında bir kanal bulunamadı, !kur komutunu kullanarak olmayan kanalları kurabilirsin.");
  }
  const cikisembed = new Discord.RichEmbed()
  .setColor("78d824")
  .addField("Çıkış", `${member} adlı üye çıkış yaptı :(`);

  ckanal.send(cikisembed);
});

client.on('ready', () => {
  let bot = `${client.user.tag}`;
  console.log(`Logged in as ` + bot);
});

client.on('message', msg => {
  if (msg.content === prefix + "ping") {
    msg.reply(client.ping + " MS");
  }

  if (msg.content === prefix + "kur"){
    if (msg.author.id !== '485515836707176458'){
      return msg.channel.send(`Bu komutu sadece <@485515836707176458> ve <@319878737078255616> kullanabilir!`);
    }
    if (!msg.guild.channels.find("name", "hoşgeldin")){
      msg.guild.createChannel("hoşgeldin");
    }
    if (!msg.guild.channels.find("name", "çıkış")) {
      msg.guild.createChannel("çıkış");
    }
  }

});

client.login(config.token);
