require("dotenv").config();
const axios = require('axios').default;
const {REST} = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");
const { Player } = require("discord-player");
const fss = require('fs');

const fs = require("node:fs");
const path = require("node:path");

const api = axios.create({
    baseURL: `http://localhost:8090`
});


//creats client with needed intents
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

//defines the commands array that is sent to guilds
const commands = [];
client.commands = new Collection();


const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
//goes throug hte commands folder and gets path for all files ending in .js
for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}
//creates discord player for music
client.player = new Player(client, {
    ytdlOptions:{
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

//client ready event
client.on("ready", () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({version: "9"}).setToken(process.env.TOKEN);
        //set bot status
        client.user.setStatus('available')
        client.user.setPresence({
            game: {
                name: 'UUUUOOOOOHHH 😭😭😭😭',
                type: "WATCHING",
                url: "https://watame.fumo.life/wakipaisaikyou/yVUHTS3W"
            }
        });
    //sends commands to the guilds
    for(const guildId of guild_ids){
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),{
            body: commands
        })
        .then(()=>console.log(`Added commands to ${guildId}`))
        .catch(console.error);
    }
});
//event for handling commands
client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute({client, interaction});
    }
    catch(err){
        console.log(err);
        //await interaction.reply("shit brokey");
    }
});
client.on("messageDelete", (message) => {
    return;
})
//handles gifadding
client.on('messageCreate', (message) => {

    if(message.channelId === "994472756248850462" && !(message.author.id === "994031394298798100")){
        console.log("Message found")
        if(message.content.includes(".gif") || message.content.includes("-gif-")){
            console.log("gif seen")
            message.react('✅').then(() => message.react('🚫'));
            const filter = (reaction, user) => {
                return ['✅', '🚫'].includes(reaction.emoji.name) && user.id === "212816510555521024";
            };
            message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
		        const reaction = collected.first();

		        if (reaction.emoji.name === '✅') {
		        	fss.appendFile('./commands/gifs.txt', "\r\n" + message.content, (err) => {
                        return console.log(err);
                    });
		        } else if(reaction.emoji.name === '🚫'){
		        	message.reply('Not based enough');
		        }
	        })
	        .catch(collected => {
		        message.channel.send('message deleted :(');
	        });
        }
    }
});

client.player.on("trackEnd", (queue) =>{
    console.log(`track ended in ${queue.guild.id}`)
    api.delete(`/servers/song/${queue.guild.id}`).then(function (response){
        console.log(response.body);
    })
})

client.login(process.env.TOKEN);

