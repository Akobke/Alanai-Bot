const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed, DiscordAPIError } =      require("discord.js");
const axios = require('axios').default;

const api = axios.create({
    baseURL: `http://localhost:8080`
});


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
        await api.delete(`/servers/${interaction.guild.id}`);
        await interaction.reply("Ok I go now!")
    }
}