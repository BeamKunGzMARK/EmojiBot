const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");
const DBL = require("dblapi.js");
const generator = require("generate-password");
const readline = require("readline");
const ytdl = require("ytdl-core");
const axios = require("axios").default;
const chalk = require("chalk");
const request = require("request");
const Keytop = "top.gg";
const dbl = new DBL(Keytop, client);

const fs = require("fs");
const { send, cpuUsage } = require("process");
const talkedRecently = new Set();
const server = require("websocket");
const express = require("express");
const http = require("http");
const app = express();
const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldVaule;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const cpus = require("os");
const config = require("./config.json");
const { getMember, formatDate } = require("./functions.js");
const Canvas = require("canvas");
const BOATS = require("boats.js");
const Boats = new BOATS("discord.boats");
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36";
const moment = require("moment");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();
const webhookID = "idfirebase";
const webhooktoken = "tokenfirebase";
const webhookClient = new Discord.WebhookClient(webhookID, webhooktoken);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
//KEY
const discordkey = config.Token;
// KEY
const ramusage = process.memoryUsage().heapUsed / 1024 / 1024;

const EmbedWelcome = new Discord.MessageEmbed()
  .setColor("#16E9DE")
  .setURL("urllink")
  .setTitle("Emoji")
  .setAuthor("", "", "https://discord.gg/myGR7qC")
  .addField("Vote me", "[Vote](https://top.gg/bot/716682990507261983/vote)")
  .addField("Invite Bot ", "[Invite](https://bit.ly/2XqdJ85)")
  .addField("Prefix", "!!")
  .addField("commands", "help, botinfo, emoji, donate")
  .addField("command need permission", "clear")
  .addField("Support Server , Join us", "[Join](https://discord.gg/myGR7qC)")
  .addField("Donate", "[Donate](https://paypal.me/BeamKunGzMARK)")
  .addField(
    "Donate (NONE MONEY TO PAY)",
    "[Donate](https://direct-link.net/100412/Donate)"
  )
  .setThumbnail(
    "https://cdn.discordapp.com/app-icons/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png"
  )
  .setTimestamp()
  .setFooter(
    "BeamKunGzMARK#9362",
    "https://cdn.discordapp.com/avatars/249415393733509120/7b1a334bafe4f40a22f7f3427a87545d.png?size=128"
  );

client.on("ready", async (message) => {
  client.user.setActivity(`!!help | ${client.guilds.cache.size} servers`, {
    type: "PLAYING",
  });
  console.log(`!!help | ${client.guilds.cache.size} servers`);
  client.guilds.cache.forEach(async (member) => {
    var idserver = `${member.id}`;
    var memserver = client.guilds.cache.get(idserver);
    memserver.members.cache.forEach(async (member) => {
      var userid = member.user.id;
    }); // get user tag all guild
  });

  Boats.postStats(client.guilds.cache.size, "726833609326985276")
    .then(() => {
      console.log(`${chalk.green("Success")} - Posted [Discord.Boats]`);
    })
    .catch((err) => {
      console.log(`${chalk.red("[ERROR]")} - Failed [Discord.Boats]`);
    });

  axios({
    method: "post",
    url: `https://botsfordiscord.com/api/bot/726833609326985276`,
    data: { server_count: client.guilds.cache.size },
    headers: {
      Authorization: `3b74dee27e11f679985a9c2bcd62c32e4b271d5096c00c5f1f55b18aeaee41878e7600d01270c474a70bf87f261ae1500ccc04120499f9e3fbe2d8237570ad17`,
      "Content-Type": `application/json`,
    },
  })
    .then(() =>
      console.log(`${chalk.green("Success")} - Posted [Botsfordiscord.com]`)
    )
    .catch((ex) =>
      console.log(`${chalk.red("[ERROR]")} - Failed [Botsfordiscord.com]`)
    );

  axios({
    method: "post",
    url: `https://disforge.com/api/botstats/726833609326985276`,
    data: { servers: client.guilds.cache.size },
    headers: {
      Authorization: `ffa33a5dbde8bd71bab9465852c71baca03359efc74ded21b098cbc43d3b1644`,
    },
  })
    .then(() =>
      console.log(`${chalk.green("Success")} - Posted [disforge.com]`)
    )
    .catch((ex) =>
      console.log(`${chalk.red("[ERROR]")} - Failed [disforge.com]`)
    );

  axios({
    method: "post",
    url: `https://discordbotlist.com/api/v1/bots/726833609326985276/stats`,
    data: { guilds: client.guilds.cache.size },
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjcyNjgzMzYwOTMyNjk4NTI3NiIsImlhdCI6MTU5ODI4ODY0Mn0.0LSphjFcpEQxh0-zTvbPmDqf-L8i-xoAGVGTUENAcpQ`,
    },
  })
    .then(() =>
      console.log(`${chalk.green("Success")} - Posted [discordbotlist.com]`)
    )
    .catch((ex) =>
      console.log(`${chalk.red("[ERROR]")} - Failed [discordbotlist.com]`)
    );
});

// Optional events
dbl.on("posted", () => {
  console.log(`${chalk.green("Success")} - Posted [discordbotlist.com]`);
});

dbl.on("error", (e) => {
  console.log(`Oops! ${e}`);
});

client.on("guildCreate", async (guild, gData) => {
  const guildc = new Discord.MessageEmbed()
    .setColor("#0080FF")
    .setTitle(`Guild Create ${guild.name}`)
    .setDescription(
      `**Guild name**\n${guild.name}\n\n**Guild id**\n${guild.id}\n\n**Have Members **\n${guild.memberCount}\n\n`
    )
    .setThumbnail(
      guild.iconURL((size = 128)) ||
        "https://cdn.discordapp.com/avatars/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png?size=128"
    );
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`!!help | ${client.guilds.cache.size} servers`, {
    type: "PLAYING",
  });

  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });
  //defaultChannel will be the channel object that the bot first finds permissions for
  defaultChannel.send(EmbedWelcome);

  const guilddatawel = db.collection("guilds-emoji").doc(guild.id);
  const docawel = await guilddatawel.get();

  if (!docawel.exists) {
    db.collection("guilds-emoji").doc(guild.id).set({
      guildId: guild.id,
      guildName: guild.name,
      guildOwner: guild.owner.user.username,
      guildOwnerId: guild.owner.id,
      guildMemberCount: guild.memberCount,
      Status: "Online",
    });
  } else {
    db.collection("guilds-emoji").doc(guild.id).update({
      guildId: guild.id,
      guildName: guild.name,
      guildOwner: guild.owner.user.username,
      guildOwnerId: guild.owner.id,
      guildMemberCount: guild.memberCount,
      Status: "Online",
    });
  }

  webhookClient.send({
    username: "Guild Create",
    avatarURL:
      "https://cdn.discordapp.com/avatars/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png?size=128",
    embeds: [guildc],
  });
});

client.on("guildDelete", (guild) => {
  const guildd = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`Guild Delete ${guild.name}`)
    .setDescription(
      `**Guild name**\n${guild.name}\n\n**Guild id**\n${guild.id}\n\n**Have Members **\n${guild.memberCount}\n\n`
    )
    .setThumbnail(
      guild.iconURL((size = 128)) ||
        "https://cdn.discordapp.com/avatars/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png?size=128"
    );
  // this event triggers when the bot is removed from a guild.
  console.log(
    `I have been removed from: ${guild.name} (id: ${guild.id}) This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`!!help | ${client.guilds.cache.size} servers`, {
    type: "PLAYING",
  });

  webhookClient.send({
    username: "Guild Delete",
    avatarURL:
      "https://cdn.discordapp.com/avatars/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png?size=128",
    embeds: [guildd],
  });

  db.collection("guilds-emoji").doc(guild.id).update({
    guildId: guild.id,
    guildName: guild.name,
    guildOwner: guild.owner.user.username,
    guildOwnerId: guild.owner.id,
    guildMemberCount: guild.memberCount,
    Status: "Offline",
  });
});

client.on("guildMemberAdd", async (member) => {
  const datacheckmem = db.collection("guilds-emoji").doc(member.guild.id);
  const membercs = await datacheckmem.get();
  const checkmis = member.guild.memberCount - membercs.data().guildMemberCount;
  const numcheck = checkmis >= 50;
  if (!numcheck) {
    return console.log(`${chalk.red(`${checkmis} <= 50`)}`);
  }

  db.collection("guilds-emoji").doc(member.guild.id).update({
    guildMemberCount: member.guild.memberCount,
  });
});

client.on("guildMemberRemove", async (member) => {
  const datacheckmem = db.collection("guilds-emoji").doc(member.guild.id);
  const membercs = await datacheckmem.get();
  const checkmis = member.guild.memberCount - membercs.data().guildMemberCount;
  const numcheck = checkmis <= 50;
  if (!numcheck) {
    return console.log(`${chalk.red(`${checkmis} >= 50`)}`);
  }

  db.collection("guilds-emoji").doc(member.guild.id).update({
    guildMemberCount: member.guild.memberCount,
  });
});

client.on("message", async (message) => {
  var allEmotes = [];

  const prefix = "!!";
  const args = message.content.split(/ +/g).slice(0);

  // emoji zone

  const guilddata = db.collection("guilds-emoji").doc(message.guild.id);
  const doca = await guilddata.get();
  const botfordiscord = await axios({
    method: "get",
    url: `https://botsfordiscord.com/api/bot/726833609326985276/votes`,
    headers: {
      Authorization: `3b74dee27e11f679985a9c2bcd62c32e4b271d5096c00c5f1f55b18aeaee41878e7600d01270c474a70bf87f261ae1500ccc04120499f9e3fbe2d8237570ad17`,
      "Content-Type": `application/json`,
    },
  });

  if (!doca.exists) {
    console.log("NEW SERVER HAS BEEN ADD IN DB");
    db.collection("guilds-emoji").doc(message.guild.id).set({
      guildId: message.guild.id,
      guildName: message.guild.name,
      guildOwner: message.guild.owner.user.username,
      guildOwnerId: message.guild.owner.id,
      guildMemberCount: message.guild.memberCount,
      Status: "Online",
    });
  } else {
  }

  const EmbedBotinfo = new Discord.MessageEmbed()
    .setColor("#16E9DE")
    .setURL("https://discord.gg/myGR7qC")
    .setTitle("Emoji Info")
    .setAuthor("", "", "https://discord.gg/myGR7qC")
    .addField("Bot's Owner", `<@249415393733509120>`)
    .addField("Servers", `${client.guilds.cache.size}`)
    .addField("Channels", `${client.channels.cache.size}`)
    .addField("Donate", "[Donate](https://paypal.me/BeamKunGzMARK)")
    .addField(
      "Donate (NONE MONEY TO PAY)",
      "[Donate](https://direct-link.net/100412/Donate)"
    )
    .addField("Vote me", "[Vote](https://top.gg/bot/716682990507261983/vote)")
    .addField("Ram usage", ramusage)
    .setThumbnail(
      "https://cdn.discordapp.com/app-icons/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png"
    )
    .setTimestamp()
    .setFooter(
      "BeamKunGzMARK#9362",
      "https://cdn.discordapp.com/avatars/249415393733509120/7b1a334bafe4f40a22f7f3427a87545d.png?size=128"
    );

  const emo0 = ":DiscordController:716576935517487195";
  const emo1 = ":js:716578675570507827";
  const emo2 = ":python:715603903734874212";
  const emo3 = ":microsoft:715603903642599524";
  const emo4 = ":github:715603903672221786";
  const emo5 = ":VSCode:716575494107299921";
  const emo6 = ":1nitro:715604145553539153";
  const emo7 = ":DiscordCoin:716576935643316274";
  const emo8 = ":DiscordLuckyblock:716576935567687760";
  const emo9 = ":malwarebytes:716573778913525781";
  const emo10 = ":apple1:716573778846416956";
  const emo11 = ":MySQL:716573778376917072";
  const emo12 = ":intellij:716573776720166914";
  const emo13 = ":gift1:715604192852574278";
  const emo14 = ":Bitcoin:715603904087195758";
  const emo15 = ":javascript:715603903961628722";
  const emo16 = ":YouTube:715603903928074310";
  const emo17 = ":discord:715603903772753960";
  const emo18 = ":Facebook:715603903814565979";
  const emo19 = ":twitch:715603903697125386";
  const emo20 = ":PAYPAL:715603903642599565";
  const emo21 = ":instagram:715603903634341888";
  const emo22 = ":Twitter:715603903605112832";
  const emo23 = ":Verified:715603903323832381";
  const emo24 = ":aa:717426520024547428";
  const emo25 = ":ac:717426520196513938";
  const emo26 = ":ad:717426520217354352";
  const emo27 = ":ae:717426519747592506";
  const emo28 = ":ab:717426519701717074";
  const emo29 = ":001surprise:718135896783716452";
  const emo30 = ":002artist:718135896326537229";
  const emo31 = ":003santaclaus:718135897375375451";
  const emo32 = ":004warm:718135896834048021";
  const emo33 = ":005costume:718135896448303226";
  const emo34 = ":006drink:718135896729452686";
  const emo35 = ":007music:718135896372805784";
  const emo36 = ":008idea:718135896746229900";
  const emo37 = ":009thief:718135896729321472";
  const emo38 = ":010angry1:718135896775458856";
  const emo39 = ":011drunk:718135897903595560";
  const emo40 = ":012fear:718135896632983564";
  const emo41 = ":013reading:718135896720932864";
  const emo42 = ":014movie:718135897681428480";
  const emo43 = ":015beauty2:718135896473600022";
  const emo44 = ":016embarrassed:718135896750424084";
  const emo45 = ":017ghost:718135898201522329";
  const emo46 = ":018drawing:718135897354141777";
  const emo47 = ":019cool:718135896519475242";
  const emo48 = ":020swim:718135896745967678";
  const emo49 = ":021angel:718135896783847444";
  const emo50 = ":022beauty1:718135898503512064";
  const emo51 = ":023photographer:718135896406360115";
  const emo52 = ":024phonecall:718135896544903279";
  const emo53 = ":025doctor:718135896465211475";
  const emo54 = ":026dancing:718135897454804994";
  const emo55 = ":027sing:718135896515412020";
  const emo56 = ":028painter:718135896834048090";
  const emo57 = ":029boxing:718135897308266587";
  const emo58 = ":030scientist:718135896674926693";
  const emo59 = ":031kiss:718135896968396842";
  const emo60 = ":032beauty:718135896892768296";
  const emo61 = ":033eat:718135896825659502";
  const emo62 = ":034devil:718135896972722287";
  const emo63 = ":035crying:718135896607817750";
  const emo64 = ":036sick:718135896989237379";
  const emo65 = ":037space:718135897937412156";
  const emo66 = ":038think:718135896863408138";
  const emo67 = ":039dizzy:718135896867602492";
  const emo68 = ":040birthday:718135897274581012";
  const emo69 = ":041shower:718135896871927858";
  const emo70 = ":042inlove:718135897148882986";
  const emo71 = ":043laughing:718135896964071434";
  const emo72 = ":044worker:718135897547079730";
  const emo73 = ":045sleep:718135896896962640";
  const emo74 = ":046selfie:718135896620400683";
  const emo75 = ":047chef:718135896972460073";
  const emo76 = ":048exercise:718135897651937281";
  const emo77 = ":049happy:718135897203146782";
  const emo78 = ":050angry:718135897773572098";
  //

  const EmbedHelp = new Discord.MessageEmbed()
    .setColor("#16E9DE")
    .setURL("https://discord.gg/myGR7qC")
    .setTitle("Emoji")
    .setAuthor("", "", "https://discord.gg/myGR7qC")
    .addField("Invite Bot ", "[Invite](https://bit.ly/2XqdJ85)")
    .addField("Prefix", "!!")
    .addField(
      "commands",
      "emoji, emojis, gemoji, gemojis, invite, donate, serverinfo, emojichecker, Listemoji, botinfo, ping, whois"
    )
    .addField("Support Server , Join us", "[Join](https://discord.gg/myGR7qC)")
    .setThumbnail(
      "https://cdn.discordapp.com/app-icons/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png"
    )
    .setTimestamp()
    .setFooter(
      "BeamKunGzMARK#9362",
      "https://cdn.discordapp.com/avatars/249415393733509120/7b1a334bafe4f40a22f7f3427a87545d.png?size=128"
    );

  const chatbug = new Discord.MessageEmbed()
    .setColor("#FF4A4A")
    .setTitle("Can't Send DM")
    .setDescription(
      `I wasn't able to send you a message! Please ensure you have DMs turned on, then run command in this channel again.`
    )
    .setThumbnail(
      "https://cdn.discordapp.com/app-icons/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png"
    )
    .setTimestamp()
    .setImage(
      "  https://images-ext-1.discordapp.net/external/4LVi7Hz2MA1H5DwWUZNpzY05hn_qf5-zEIGTGB_77p4/https/i.imgur.com/Xa5XoEK.png?width=936&height=525"
    )
    .setFooter(
      "BeamKunGzMARK#9362",
      "https://cdn.discordapp.com/avatars/249415393733509120/7b1a334bafe4f40a22f7f3427a87545d.png?size=128"
    );

  const EmbedDonate = new Discord.MessageEmbed()
    .setColor("#09FF00")
    .setURL("https://paypal.me/BeamKunGzMARK")
    .setTitle("Donate")
    .setAuthor("", "", "https://paypal.me/BeamKunGzMARK")
    .addField("Vote me", "[Vote](https://top.gg/bot/716682990507261983/vote)")
    .addField("Donate", "[Donate](https://paypal.me/BeamKunGzMARK)")
    .addField(
      "Donate (NONE MONEY TO PAY)",
      "[Donate](https://direct-link.net/100412/Donate)"
    )
    .setThumbnail(
      "https://cdn.discordapp.com/app-icons/726833609326985276/508551b7bb3f22ae2e26f749b5de1c5d.png"
    )
    .setTimestamp()
    .setFooter(
      "BeamKunGzMARK#9362",
      "https://cdn.discordapp.com/avatars/249415393733509120/7b1a334bafe4f40a22f7f3427a87545d.png?size=128"
    );

  const Userowner = client.users.cache.get("249415393733509120");

  if (
    message.content === prefix + "emoji" ||
    message.content === prefix + "Emoji"
  ) {
    if (message.author.bot) return;
    var emoa = [
      emo0,
      emo1,
      emo2,
      emo3,
      emo4,
      emo5,
      emo6,
      emo7,
      emo8,
      emo9,
      emo10,
      emo11,
      emo12,
      emo13,
      emo14,
      emo15,
      emo16,
      emo17,
      emo18,
      emo19,
      emo20,
      emo21,
      emo22,
      emo23,
      emo24,
      emo25,
      emo26,
      emo27,
      emo28,
      emo29,
      emo30,
      emo31,
      emo32,
      emo33,
      emo34,
      emo35,
      emo36,
      emo37,
      emo38,
      emo39,
      emo40,
      emo41,
      emo42,
      emo43,
      emo44,
      emo45,
      emo46,
      emo47,
      emo48,
      emo49,
      emo50,
      emo51,
      emo52,
      emo53,
      emo54,
      emo55,
      emo56,
      emo57,
      emo58,
      emo59,
      emo60,
      emo61,
      emo62,
      emo63,
      emo64,
      emo65,
      emo66,
      emo67,
      emo68,
      emo69,
      emo70,
      emo71,
      emo72,
      emo73,
      emo74,
      emo75,
      emo76,
      emo77,
      emo78,
    ];
    var randomItem = emoa[Math.floor(Math.random() * emoa.length)];
    var usersent = client.users.cache.get(message.author.id);
    if (message.channel.type === "dm") {
      return usersent.send(`<${randomItem}>`);
    }
    message.channel.send(`<${randomItem}>`);
  }

  if (
    message.content === prefix + "emojis" ||
    message.content === prefix + "Emojis"
  ) {
    if (message.author.bot) return;
    var emoa = [
      emo0,
      emo1,
      emo2,
      emo3,
      emo4,
      emo5,
      emo6,
      emo7,
      emo8,
      emo9,
      emo10,
      emo11,
      emo12,
      emo13,
      emo14,
      emo15,
      emo16,
      emo17,
      emo18,
      emo19,
      emo20,
      emo21,
      emo22,
      emo23,
      emo24,
      emo25,
      emo26,
      emo27,
      emo28,
      emo29,
      emo30,
      emo31,
      emo32,
      emo33,
      emo34,
      emo35,
      emo36,
      emo37,
      emo38,
      emo39,
      emo40,
      emo41,
      emo42,
      emo43,
      emo44,
      emo45,
      emo46,
      emo47,
      emo48,
      emo49,
      emo50,
      emo51,
      emo52,
      emo53,
      emo54,
      emo55,
      emo56,
      emo57,
      emo58,
      emo59,
      emo60,
      emo61,
      emo62,
      emo63,
      emo64,
      emo65,
      emo66,
      emo67,
      emo68,
      emo69,
      emo70,
      emo71,
      emo72,
      emo73,
      emo74,
      emo75,
      emo76,
      emo77,
      emo78,
    ];
    var randomItem = emoa[Math.floor(Math.random() * emoa.length)];
    var usersent = client.users.cache.get(message.author.id);
    if (message.channel.type === "dm") {
      return usersent
        .send(`<${randomItem}>`)
        .then(() => message.react(`${randomItem}`));
    }
    message.channel
      .send(`<${randomItem}>`)
      .then(() => message.react(`${randomItem}`));
  }

  if (message.content === prefix + "ramuse") {
    message.channel.send(ramusage);
  }

  if (message.content === prefix + "checkvote") {
    let boatvote = await Boats.getVoted(client.user.id, message.author.id);
    console.log(boatvote);

    if (boatvote.error == true) {
      return message.channel.send(
        "You Need to vote to use this command Choose either or both.\n\n Top.gg : https://top.gg/bot/726833609326985276 \n\n discord.boats : https://discord.boats/bot/726833609326985276"
      );
    }
  }

  if (
    message.content === prefix + "gemoji" ||
    message.content === prefix + "Gemoji" ||
    message.content === prefix + "GEmoji"
  ) {
    //let boatvote = await Boats.getVoted(client.user.id, message.author.id);

    //console.log(boatvote)

    //if (boatvote.error == true) { return message.channel.send("Vote First"); }

    client.guilds.cache.forEach((guild) => {
      var guildemo = client.guilds.cache.get(guild.id);

      guildemo.emojis.cache.forEach((emoji) => {
        allEmotes.push(emoji.id);
      });
    });
    var usersent = client.users.cache.get(message.author.id);
    var emoji = allEmotes[Math.floor(Math.random() * allEmotes.length)];
    var emojiget = client.emojis.cache.get(emoji);
    if (message.channel.type === "dm") {
      return usersent.send(`${emojiget}`);
    }
    const channelnsfw =
      message.guild.channels.cache.find((channel) => channel.nsfw) || "None";

    function nsfwch(id) {
      return client.channels.cache.get(channelnsfw);
    }

    let countchannelnsfw = "0";

    message.guild.channels.cache.forEach((channel) => {
      if (channel.nsfw) {
        countchannelnsfw++;
      }
    });

    if (!message.channel.nsfw) {
      let Embednsfw = new Discord.MessageEmbed()
        .setTitle(`Need Channel NSFW in ${message.guild.name}.`)
        .setColor(`FF0000`);

      if (countchannelnsfw >= 2) {
        Embednsfw.setDescription(
          `**Have NSFW Channel are ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 1) {
        Embednsfw.setDescription(
          `**Have NSFW Channel is ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 0) {
        Embednsfw.setDescription(`** Have NSFW Channel is None **`);
      }

      message.channel.send(Embednsfw);
    } else {
      let Embednsfw = new Discord.MessageEmbed()
        .setTitle(`Need Channel NSFW in ${message.guild.name}.`)
        .setColor(`FF0000`);

      if (countchannelnsfw >= 2) {
        Embednsfw.setDescription(
          `**Have NSFW Channel are ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 1) {
        Embednsfw.setDescription(
          `**Have NSFW Channel is ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 0) {
        Embednsfw.setDescription(`** Have NSFW Channel is None **`);
      }
      message.channel.send(`${emojiget}`);
    }
  }

  if (message.content === prefix + "shard") {
    message.channel.send(
      `Server count: ${totalGuilds}\nMember count: ${totalMembers}`
    );
  }

  if (
    message.content === prefix + "serverinfo" ||
    message.content === prefix + "Serverinfo" ||
    message.content === prefix + "ServerInfo"
  ) {
    const guildget = client.guilds.cache.get(message.guild.id);
    const roles = guildget.roles.cache.size;

    const membercount = guildget.memberCount;
    // User variables
    const created = new Intl.DateTimeFormat("en-US").format(guildget.createdAt);

    let EmojiCount = 0;
    let channeltext = 0;
    let channelvoice = 0;
    let channelnsfw = 0;

    guildget.channels.cache.forEach((channel) => {
      if (channel.type === "text") {
        channeltext++;
      }

      if (channel.type === "voice") {
        channelvoice++;
      }

      if (channel.nsfw) {
        channelnsfw++;
      }
    });

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }

    message.guild.emojis.cache.forEach((emoji) => {
      EmojiCount++;
    });

    const guildlogo =
      guildget.iconURL((size = 128)) ||
      "https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif";

    const embedserverinfo = new Discord.MessageEmbed()
      .setFooter(guildget.name, guildlogo)
      .setThumbnail(guildlogo)
      .setColor(`RANDOM`)
      .addField(
        "Server information:",
        `**- ID:** ${guildget.id}
            **- Name:** ${guildget.name}
            **- Members:** ${membercount}
            **- TextChannels:** ${channeltext}
            **- VoiceChannels:** ${channelvoice}
            **- NsfwChannels:** ${channelnsfw}
            **- Roles:** ${roles}
            **- Emoji:** ${EmojiCount}
            **- Created at**: ${created}`,
        true
      )

      .setTimestamp();

    message.channel.send(embedserverinfo);
  }

  if (
    message.content === prefix + "gemojis" ||
    message.content === prefix + "Gemojis" ||
    message.content === prefix + "GEmojis"
  ) {
    client.guilds.cache.forEach((guild) => {
      var guildemo = client.guilds.cache.get(guild.id);

      guildemo.emojis.cache.forEach((emoji) => {
        allEmotes.push(emoji.id);
      });
    });
    var usersent = client.users.cache.get(message.author.id);
    var emoji = allEmotes[Math.floor(Math.random() * allEmotes.length)];
    var emojiget = client.emojis.cache.get(emoji);
    if (message.channel.type === "dm") {
      return usersent.send(`${emojiget}`);
    }
    const channelnsfw =
      message.guild.channels.cache.find((channel) => channel.nsfw) || "None";

    function nsfwch(id) {
      return client.channels.cache.get(channelnsfw);
    }

    let countchannelnsfw = "0";

    message.guild.channels.cache.forEach((channel) => {
      if (channel.nsfw) {
        countchannelnsfw++;
      }
    });

    if (!message.channel.nsfw) {
      let Embednsfw = new Discord.MessageEmbed()
        .setTitle(`Need Channel NSFW in ${message.guild.name}.`)
        .setColor(`FF0000`);

      if (countchannelnsfw >= 2) {
        Embednsfw.setDescription(
          `**Have NSFW Channel are ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 1) {
        Embednsfw.setDescription(
          `**Have NSFW Channel is ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 0) {
        Embednsfw.setDescription(`** Have NSFW Channel is None **`);
      }

      message.channel.send(Embednsfw);
    } else {
      let Embednsfw = new Discord.MessageEmbed()
        .setTitle(`Need Channel NSFW in ${message.guild.name}.`)
        .setColor(`FF0000`);

      if (countchannelnsfw >= 2) {
        Embednsfw.setDescription(
          `**Have NSFW Channel are ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 1) {
        Embednsfw.setDescription(
          `**Have NSFW Channel is ${countchannelnsfw}**`
        );
      }

      if (countchannelnsfw == 0) {
        Embednsfw.setDescription(`** Have NSFW Channel is None **`);
      }

      message.channel
        .send(`${emojiget}`)
        .then(() => message.react(`${emojiget.id}`));
    }
  }

  if (
    message.content === prefix + "emojichecker" ||
    message.content === prefix + "EmojiChecker" ||
    message.content === prefix + "Emojichecker"
  ) {
    if (!message.guild) return message.channel.send("Can't use in dm");
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Animated [${Animated}]**\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(`RANDOM`);
    message.channel.send(Embed);
  }

  if (
    message.content === prefix + "Listemoji" ||
    message.content === prefix + "LISTEMOJI" ||
    message.content === prefix + "ListEmoji"
  ) {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    client.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`Emojis in List All SERVER.`)
      .setDescription(
        `**Animated**:\n${Animated}\n\n**Standard**:\n${EmojiCount}\n\n`
      )
      .setColor(`RANDOM`);

    message.channel.send(Embed);
  }

  if (message.content === prefix + "prefix") {
    message.channel.send("Prefix is : " + prefix);
  }

  if (
    message.content === prefix + "help" ||
    message.content === prefix + "Help" ||
    message.content === prefix + "HELP"
  ) {
    message.channel.send(EmbedHelp);
  }

  if (
    message.content === prefix + "invite" ||
    message.content === prefix + "invites" ||
    message.content === prefix + "INVITE" ||
    message.content === prefix + "INVITES"
  ) {
    if (!message.guild) {
      return message.author.send(
        "https://discord.com/api/oauth2/authorize?client_id=726833609326985276&permissions=8&scope=bot"
      );
    }
    message.channel
      .send(
        "https://discord.com/api/oauth2/authorize?client_id=726833609326985276&permissions=8&scope=bot"
      )
      .catch(() => message.channel.send(chatbug));
  }

  if (message.content === prefix + "scheck") {
    client.guilds.cache.forEach((member) => {
      console.log(
        `${member.name} - ${member.memberCount} members | id guild :  ${member.id} | owner is : ${member.owner.user.tag}`
      );
    });
  }

  if (
    message.content === prefix + "donate" ||
    message.content === prefix + "Donate" ||
    message.content === "DONATE"
  ) {
    message.channel.send(EmbedDonate);
  }

  if (
    message.content === prefix + "botinfo" ||
    message.content === prefix + "Botinfo" ||
    message.content === prefix + "BotInfo"
  ) {
    message.channel.send(EmbedBotinfo);
  }

  if (message.content === prefix + "Tsss") {
    let tags = await message.mentions.users.first();
    if (tags) {
      message.channel.send("Success");
    } else {
      message.channel.send("None");
    }
  }

  if (
    message.content === prefix + "ping" ||
    message.content === prefix + "Ping"
  ) {
    const msg = await message.channel.send(`🏓 Pinging....`);

    msg.edit(
      `🏓 Pong!\n💖️ Latency is ${Math.floor(
        msg.createdTimestamp - message.createdTimestamp
      )}ms\n💘 API Latency is ${Math.round(client.ws.ping)}ms`
    );
  }

  if (message.content === prefix + "whois") {
    let args = message.content.slice(prefix).split(/ +/g);

    console.log(args);

    if (!args[1]) {
      const member = message.guild.member(message.author.id);

      // Member variables
      var joined = new Intl.DateTimeFormat("en-US").format(message.joinedAt);
      const roles =
        member.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((r) => r)
          .join(", ") || "None";

      // User variables
      const created = formatDate(member.user.createdAt);

      const embedzxz = new Discord.MessageEmbed()
        .setFooter(
          member.displayName,
          message.author.displayAvatarURL((size = 128))
        )
        .setThumbnail(message.author.displayAvatarURL((size = 128)))
        .setColor(
          member.displayHexColor === "#000000"
            ? "#ffffff"
            : member.displayHexColor
        )
        .addField(
          "Member information:",
          `**- Display name:** ${member.displayName}
            **- Joined at:** ${joined}
            **- Roles:** ${roles}`,
          true
        )
        .addField(
          "User information:",
          `**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Created at**: ${created}`,
          true
        )
        .setTimestamp();

      if (member.user.presence.game) {
        embedzxz.addField(
          "Currently playing",
          `** Name:** ${member.user.presence.game.name}`
        );
      }

      message.channel.send(embedzxz);
    } else {
      message.channel.send("Sorry Now We Have Maintenance With Mentions Users");
    }
  }
});

// see error
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});
// see error

process.on("warning", (warning) => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

client.login(discordkey).catch((error) => {
  if (error.code == 4004) {
    console.log(`${chalk.red("[ERROR]")} - Invalid token`);
  } else {
    console.log(`${chalk.red("[ERROR]")} - ${error}`);
  }
}); //https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L788
