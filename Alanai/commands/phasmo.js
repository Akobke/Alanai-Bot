const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { execute } = require("./play")
const nHentai = require('shentai')
const sHentai = new nHentai

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

        await sHentai.getRandom().then(doujin => console.log(doujin))
        await interaction.reply("The code was " + code + " " + code.length);
    }
}