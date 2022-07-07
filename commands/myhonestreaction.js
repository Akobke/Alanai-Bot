const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, Guild } = require("discord.js")
const { QueryType } = require("discord-player")
const {readFileSync, promises: fsPromises} = require('fs');

const reactions = syncReadFile('./commands/gifs.txt');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("myhonestreaction")
        .setDescription("got the whole squad laughing"),
    execute: async({client, interaction}) => {
        
        const image = Math.floor(Math.random() * reactions.length);
        console.log(reactions[image])
        
        console.log("used in " + client.Guild);
        await interaction.reply(reactions[image]);
    }
}

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    console.log(arr); 
  
    return arr;
}
  