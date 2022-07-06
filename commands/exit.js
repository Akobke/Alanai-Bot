const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } =      require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Exits the VC, and destroys the queue"),
    execute: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guild);

        if(!queue){
            await interaction.reply("There is no song currently playing");
            return;
        }

        const currentSong = queue.current;

        queue.destroy();

        await interaction.reply("Ok I go now!")
    }
}