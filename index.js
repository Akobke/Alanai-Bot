require("dotenv").config();

const {REST} = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");
const { Player } = require("discord-player");
const fss = require('fs');

const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.player = new Player(client, {
    ytdlOptions:{
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

client.on("ready", () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({version: "9"}).setToken(process.env.TOKEN);

        client.user.setStatus('available')
        client.user.setPresence({
            game: {
                name: 'UUUUOOOOOHHH 😭😭😭😭',
                type: "WATCHING",
                url: "https://watame.fumo.life/wakipaisaikyou/yVUHTS3W"
            }
        });

    for(const guildId of guild_ids){
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),{
            body: commands
        })
        .then(()=>console.log(`Added commands to ${guildId}`))
        .catch(console.error);
    }
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute({client, interaction});
    }
    catch(err){
        console.log(err);
        await interaction.reply("shit brokey");
    }
});

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
		        	fss.appendFile('./commands/gifs.txt', message.content + "\r\n", (err) => {
                        return console.log(err);
                    });
		        } else {
		        	message.reply('Not based enough');
		        }
	        })
	        .catch(collected => {
		        message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
	        });
        }
    }
});

client.login(process.env.TOKEN);

