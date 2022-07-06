const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { execute } = require("./play")
const { API, TagTypes, } = require('nhentai-api');

const api = new API();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("phasmo")
    .setDescription("Searches for a Phasmo lobby")
            .addStringOption(option =>
                option.setName("code").setDescription("Phasmo Lobby Code").setRequired(true)
            ),
    execute: async ({client, interaction}) =>{
        let code = interaction.options.getString("code");
        
        if(!(code.length === 6)){
            await interaction.reply("That is not a valid Phasmo code!");
            return;
        }

        await interaction.reply("The code was " + code + " " + code.length);
    }
}