const Discord = require('discord.js');
const prefix = ";"
const token = require("./token.json");
const fs = require("fs");
const bdd = require("./bdd.json");
const ytdl = require("ytdl-core");
const answer = ["**I think...yes!**", "**Duh...maybe**", "**Of course!**", "**To be honest, i don't know...**", "**Miku Miku say yasss !!**", "**NO.**"]
const rate = ["**1/10**", "**2/10**", "**3/10**", "**4/10**", "**5/10**", "**6/10**", "**7/10**", "**8/10**", "**9/10**", "**10/10**"]
const lovecalc = ["**2%** of love 💔*...try again*", "**10%** of love 💔*...so bad...* ", "**29%** of love ❣️, *maybe next time...*", "**41%** of love 💞, *not bad...not bad.*", "**58%** of love 💓, *seems good !*", "**75%** of love ❤️ **UwU**", "**88%** of love 💗 **UwU** x2", "**96%** of love 💝...*what a wonderful couple !*", "**100%** of love 💖 , *future married*"]


const bot = new Discord.Client();

const queue = new Map();






bot.on("ready", async () => {
    console.log("The bot is connected !")
    bot.user.setStatus("online")
    bot.user.setActivity("🎵 | Vibing Miku", {type: 'LISTENING'})
});


bot.on("message",  message => {


    if(message.content.startsWith(prefix + "clear")){
    message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){

                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`You delted ${args[1]} message(s) successfully !`)

                }
                else{
                    message.channel.send("You must specify a value between **1** and **99** !")
                }
            }
            else{
                message.channel.send("you must indicate a **number** of message(s) to delete!")
            }
        }
        else{
            message.channel.send("**You must have the necessary permissions to execute this command!**")
        }
    }

    if(message.content.startsWith(prefix + "warn")){
        if(message.member.hasPermission('BAN_MEMBERS')){

            if(!message.mentions.users.first()) return;
            utilisateur = message.mentions.users.first().id

            if(bdd["warn"][utilisateur] == 2){

                delete bdd["warn"][utilisateur]
                message.guild.members.ban(utilisateur)
            }
            else{
                if(!bdd["warn"][utilisateur]){
                    bdd["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send("** ⚠️ You now have **" + bdd["warn"][utilisateur] + "** warn ! ⚠️ **")
                }
                else{
                    bdd["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send("** ⚠️ You now have **" + bdd["warn"][utilisateur] + "** warns ! ⚠️ **") ; 
                }
            }
        }
    }
    
  if(message.content.startsWith(prefix + "doc.js")){
        message.delete();

        let user = message.author

        const embed = new Discord.MessageEmbed()
        .setColor(0x1affff)
        .setTimestamp()
        .setTitle("Here is the documentaton")
        .setURL("https://discordjs.guide/popular-topics/embeds.html")
        .setDescription(`Hey ${user}, click the title !`)
        .setImage("https://i.kym-cdn.com/entries/icons/original/000/015/721/452.gif")
        return message.channel.send(embed)
    }

  if(message.content.startsWith(prefix + "id")){
        message.delete();

        let user = message.author.username

        const embed = new Discord.MessageEmbed()
        .setColor(0x00e600)
        .setTitle(user + ` id is :   ` + message.id)
        return message.channel.send(embed)
    }

  if(message.content.startsWith(prefix + "tag")){
    message.delete();

    let user = message.author.username

    const embed = new Discord.MessageEmbed()
    .setColor(0x00e600)
    .setTitle(" 🪀  Username and tag :   " + message.author.tag)
    return message.channel.send(embed)
  }

  if(message.content.startsWith(prefix + "reddit")){
        message.delete();

        const embed = new Discord.MessageEmbed()
        .setColor(0xff6600)
        .setTitle("**__Reddit__**")
        .setURL("https://www.reddit.com/")
        .setDescription("***Reddit** is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!*")
        .setImage("https://upload.wikimedia.org/wikipedia/fr/thumb/5/58/Reddit_logo_new.svg/1200px-Reddit_logo_new.svg.png")
        return message.channel.send(embed)
    }

  if(message.content.startsWith(prefix + "kiss")){
      if(!message.mentions.users.first()) return;
      utilisateur = message.mentions.users.first();
      message.delete();

      let user = message.author

      const embed = new Discord.MessageEmbed()
      .setColor(0x1affff)
      .setTimestamp()
      .setTitle("**Here is your Kiss**  😘 😘 ")
      .setDescription(`${user} gave a kiss to ${utilisateur} !`)
      .setImage("https://yzgeneration.com/wp-content/uploads/2016/07/Kiss-6.gif")
      return message.channel.send(embed)
  }
  
  if(message.content.startsWith(prefix + "slap")){
    if(!message.mentions.users.first()) return;
    utilisateur = message.mentions.users.first();
    message.delete();

    let user = message.author

    const embed = new Discord.MessageEmbed()
    .setColor(0x1affff)
    .setTimestamp()
    .setTitle("**SLAP !!** ")
    .setDescription(`${user} slaps ${utilisateur} !`)
    .setImage("https://i.imgur.com/W6qDaSl.gif")
    return message.channel.send(embed)
} 

if(message.content.startsWith(prefix + "hug")){
  if(!message.mentions.users.first()) return;
  utilisateur = message.mentions.users.first();
  message.delete();

  let user = message.author

  const embed = new Discord.MessageEmbed()
  .setColor(0x1affff)
  .setTimestamp()
  .setTitle("**Hug time !!** 🥰 🥰 ")
  .setDescription(`${user} hugs ${utilisateur} !`)
  .setImage("https://acegif.com/wp-content/uploads/anime-hug.gif")
  return message.channel.send(embed)
} 

if(message.content.startsWith(prefix + "punch")){
  if(!message.mentions.users.first()) return;
  utilisateur = message.mentions.users.first();
  message.delete();

  let user = message.author

  const embed = new Discord.MessageEmbed()
  .setColor(0x1affff)
  .setTimestamp()
  .setTitle("**Get Punched !!**  👊")
  .setDescription(`${user} punches ${utilisateur} !`)
  .setImage("https://i.pinimg.com/originals/45/ba/f9/45baf9eb565e939d2fd4e31bfd845d13.gif")
  return message.channel.send(embed)
}

if(message.content.startsWith(prefix + "slice")){
  if(!message.mentions.users.first()) return;
  utilisateur = message.mentions.users.first();
  message.delete();

  let user = message.author

  const embed = new Discord.MessageEmbed()
  .setColor(0x1affff)
  .setTimestamp()
  .setTitle("**Yayy...slashed !**   🔪 ")
  .setDescription(`${utilisateur} got sliced by ${user} !`)
  .setImage("https://thumbs.gfycat.com/AccomplishedDefiantAsianporcupine-size_restricted.gif")
  return message.channel.send(embed)
}

if(message.content.startsWith(prefix + "help")){
  message.delete();

  const embed = new Discord.MessageEmbed()
  .setColor(0x33ccff)
  .setTitle("** 📋   __Here are my commands : __**")
  .setThumbnail("https://www.24hrpo.com/wp-content/uploads/2012/08/icon-services-it_2x.png")
  .setDescription("🔧 (__My prefix is__  **;**) ")
  .addFields(
    { name: '⚠️ Warn commande :', value: ' Type `;warn + @username` , each username have **2 warns**, the **3rd** will be a **ban !** *[This commande is only for thoses who have BAN MEMBERS permission]*'},
    { name: '🧹 Clear commande : ', value: ' Type `;clear x` , with x = **1 to 99** *[This commande is only for thoses who have MANAGE MESSAGES permission]*'},
    { name: '▶️ Play commande : ', value: 'Type `;play` + *video URL* to play music ! *(you can also  skip and stop)*' },
    { name: '🆔 I.D commande : ', value: ' Type `;id` to reveal and know your discord identity !' },
    { name: '📚 Discord.js  : ', value: 'Type `;doc.js` to go to **discord JS** website **!** *(discord.js is a powerful node.js module that allows you to interact with the Discord API very easily).*' },
    { name: '🟠 Reddit : ', value: 'Type `;reddit` to go to **Reddit** website **!** *(Reddit is a network of communities based on peoples interests. Find communities youre interested in, and become part of an online community).*' },
    { name: '🎯 Actions : ', value: ' Type `;actions` to see some actions that you can do by using the bot !' },
    { name: '🎱 8ball : ', value: ' Type `;8ball + (arg)` to interact with hatsune by asking questions !' },
    { name: '📊 Poll : ', value: ' Type `;poll + (arg)` to display a poll with 3 suggestions *(yes, no, i dont know...)* !' },
    { name: '📌 Rate : ', value: ' Type `;rate + @username`, so the bot will rate the mentioned user  *(1/10, 2/10, 3/10...)* !' },
    { name: '💞 Love Percentage : ', value: ' Type `;lovecalc + @username`, so the bot will rate the love percentage beteen you and the mentioned user !' },
  )
  .setTimestamp()
  .setFooter("By the bot")
    
  return message.channel.send(embed)
}

if(message.content.startsWith(prefix + "actions")){
  message.delete();

  const embed = new Discord.MessageEmbed()
  .setColor(0x33ccff)
  .setTitle("** 🤠   __Here is the actions you can do : __**")
  .addFields(
    { name: '😘 Kiss :', value: ' Type `;kiss + @username` , to kiss someone ! '},
    { name: '✋ Slap : ', value: ' Type `;slap + @username` , to slap this BAKA that you mentionned !'},
    { name: '🥰 Hug : ', value: ' Type `;hug + @username` , to give a big hug to your freind !' },
    { name: '🥊 Punch : ', value: ' Type `;punch` , to give a gooood PUNCH on his face !' },
    { name: '🔪 Slice  : ', value: 'Type `;slice` to cut apart the victim !' },
  )
  .setTimestamp()
  .setFooter("By the bot")
    
  return message.channel.send(embed)
}
        
});

bot.on("guildCreate", guild => {
    bdd[guild.id] = {}
    Savebdd()
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
  
    const serverQueue = queue.get(message.guild.id);

  //Music

    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      return;
    } 

  //poll

    if(message.content.startsWith(prefix + "poll")){
      message.delete();
      
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      const embed = new Discord.MessageEmbed()
     
       .setAuthor(message.author.username, message.author.displayAvatarURL())
       .setColor(0x1affff)
       .setThumbnail("https://img.icons8.com/officel/2x/poll-topic.png")
       .setDescription("📊 " + args.join(" "))
       .addField("** Answer the question below using one of the reactions : **",
       `
       🔴 - No.
       🟢 - Yes.
       🟡 - I don't know...
       `)
       .setTimestamp()
       .setFooter("Make your choice !")
       
       const poll = await message.channel.send(embed);
       await poll.react("🔴");
       await poll.react("🟢");
       await poll.react("🟡");
      }

  //8ball

    if(message.content.startsWith(prefix + "8ball")){
      message.delete();

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
  
      const embed = new Discord.MessageEmbed()
     
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(0x1affff)
      .setThumbnail("https://www.astrologjia.com/images/magic-8-ball.png")
      .addField(args.join(" "), answer[Math.floor(Math.random() * 5)])
       
    return message.channel.send(embed)
     
     }

  //rate

    if(message.content.startsWith(prefix + "rate")){
      if(!message.mentions.users.first()) return message.channel.send("**Mention someone or yourself !**");
      utilisateur = message.mentions.users.first();
      
      message.channel.send(`I rate ${utilisateur} :  ` + rate[Math.floor(Math.random() * 9)])
      
    }

  //lovecalc

    if(message.content.startsWith(prefix + "lovecalc")){
     if(!message.mentions.users.first()) return message.channel.send("**Mention someone !**");
      utilisateur = message.mentions.users.first();
      message.delete();

      let user = message.author

      const embed = new Discord.MessageEmbed()
      .setColor(0x1affff)
      
      .setTitle("**Lovecalc**")
      .setDescription(`${user} and ${utilisateur} lovecalc is : ` + lovecalc[Math.floor(Math.random() * 8)])
      

    return message.channel.send(embed)
}

  });
  
  //Music Functions

  async function execute(message, serverQueue) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }
  
  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }



function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("**An error has occurred.**");
    });
}

bot.login(token.token);