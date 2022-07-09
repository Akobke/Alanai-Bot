const {SlashCommandBuilder} = require("@discordjs/builders");
const { MessageEmbed } =      require("discord.js");
const { QuereyType } =        require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays Epic Song")
        .addSubcommand(subcommand => 
            subcommand
                .setName("search")
                .setDescription("Searches The Tube for da song")
                .addStringOption(option => 
                    option
                        .setName("searchterms")
                        .setDescription("Searches from your words")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName("playlist")
            .setDescription("Plays A whole playlist")
            .addStringOption(option => 
                option
                    .setName("url")
                    .setDescription("Da playlist URL")
                    .setRequired(true)
            )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("song")
                .setDescription("Plays song from Youtube URL")
                .addStringOption(option => 
                    option
                        .setName("url")
                        .setDescription("Url of the song")
                        .setRequired(true)
                    )   
        ),
    execute: async ({client, interaction}) => {
        if(!interaction.member.voice.channel){
            await interaction.reply("You must be in a voice channel for me to work.");
            return;
        }

        const queue = await client.player.createQueue(interaction.guild);

        if(!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed();
        if(interaction.options.getSubcommand() === "song"){
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QuereyType.YOUTUBE_VIDEO,
            });

            if(result.tracks.length === 0){
                await interaction.reply("no results found")
                return
            }

            const song = result.tracks[0]
            await queue.addTrack(song);

            embed
                .setDescription(`Added **[${song.title}]** to the queue.`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`})
        }
        else if(interaction.options.getSubcommand() === "playlist"){
            let url = interaction.options.getString("url");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QuereyType.YOUTUBE_PLAYLIST,
            });

            if(result.tracks.length === 0){
                await interaction.reply("no playlist found");
                return
            }

            const playlist = result.playlist;
            await queue.addTracks(playlist);

            embed
                .setDescription(`Added **[${playlist.title}]** to the queue.`)
                .setThumbnail(playlist.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`});
        }
        else if(interaction.options.getSubcommand() === "search"){
            let url = interaction.options.getString("searchterms");

            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QuereyType.AUTO,
            });

            if(result.tracks.length === 0){
                await interaction.reply("no results found");
                return
            }

            const song = result.tracks[0];
            await queue.addTracks(song);

            embed
                .setDescription(`Added **[${song.title}]** to the queue.`)
                .setThumbnail(song.thumbnail)
                .setFooter({text: `Duration: ${song.duration}`});
        }

        if(!queue.playing) await queue.play();

        await interaction.reply({
            embeds: [embed]
        })

    }   
        
}