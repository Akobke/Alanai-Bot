const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("angular")
        .setDescription("tells the truth"),
    execute: async({client, interaction}) => {
        await interaction.reply("Angular is fucking garbage, svelte and react are the true kings of front end development on jah frfr (الله يكره AngularJS)")
    }
}