const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, Guild } = require("discord.js")
const { QueryType } = require("discord-player")

const reactions = ["https://media.discordapp.net/attachments/664176436390789133/982327441945157692/unknown-1.gif?width=416&height=567", 
                    "https://media.discordapp.net/attachments/965181691981357056/968191577291911228/ezgif-1-6cc5da22c0.gif",
                     "https://media.discordapp.net/attachments/887948904522473492/974993529048805396/factchecked-1.gif",
                    "https://media.discordapp.net/attachments/483134060403884032/862094754673197097/image0-81.gif",
                    "https://media.discordapp.net/attachments/362026214011174913/973507393306628147/98DE2B55-AC8B-4FC1-BB05-FF3FAF5FE115.gif",
                    "https://tenor.com/view/vaccine-a%C5%9F%C4%B1-turkovac-turko-turk-gif-22109989",
                    "https://media.discordapp.net/attachments/895572379282055208/992383711888818246/4CB6D044-2D46-4BD3-976C-CA105F9F2C9F.gif",
                    "https://media.discordapp.net/attachments/721821486599503937/991791666165985450/0D46A907-333B-4650-9AD6-F141BEF4AC8D.gif",
                    "https://imgur.com/wwE4oE9",
                    "https://media.discordapp.net/attachments/737521938045599745/884617389726113802/Fa5C2k8GB1c.gif",
                    "https://media.discordapp.net/attachments/707913070927806505/968887199934345277/448B20AC-A3B8-4026-BC33-90649AAE8216.gif",
                    "https://media.discordapp.net/attachments/810213541088198684/962464234770415637/20220222_163558.gif",
                    "https://media.discordapp.net/attachments/637278052031922176/982030079808917604/feffeff.gif",
                    "https://media.discordapp.net/attachments/664176436390789133/982331284439318608/Astolfo2.gif",
                    "https://tenor.com/view/american-psycho-bestie-so-true-patrick-bateman-angel-gif-23081489",
                    "https://tenor.com/view/benim-s%C4%B1fat-gif-22499834",
                    "https://media.discordapp.net/attachments/824302363984527360/957392117368512622/ezgif.com-gif-maker_65.gif",
                    "https://media.discordapp.net/attachments/574628800265060374/970096807503880212/chilling.gif",
                    "https://media.discordapp.net/attachments/801271365365792828/976349949438599208/IMG_2578.gif",
                    "https://tenor.com/view/cat-shaking-angry-angy-kitten-gif-25553830",
                    "https://media.discordapp.net/attachments/750613823056248842/960461375375818812/wall.gif",
                    "https://media.discordapp.net/attachments/536270366218125322/972810317400793088/feet2.gif",
                    "https://media.discordapp.net/attachments/885710706350116915/984279080486719549/big-pants-1.gif",
                    "https://media.discordapp.net/attachments/885710706350116915/984656757215330364/dogpee.gif",
                    "https://tenor.com/view/felix-re-zero-felix-argyle-speech-bubble-speech-gif-25397116",
                    "https://tenor.com/view/demon-core-beloved-locket-nonagon-gif-26043045",
                    "https://tenor.com/view/i-am-better-than-you-mona-megistus-mona-genshin-impact-gif-24354474",
                    "https://tenor.com/view/mihoyo-genshin-genshin-impact-kazuha-i-know-gif-23174652",
                    "https://tenor.com/view/kpop-chaeyoung-gif-22307265",
                    "https://cdn.discordapp.com/emojis/797245332442054656.gif?v=1",
                    "https://tenor.com/view/mihoyo-genshin-genshin-impact-thoma-handsome-cute-gif-23710440",
                    "https://tenor.com/view/hu-tao-genshin-impact-better-then-you-heart-locket-huutaoo-gif-20258503",
                    "https://tenor.com/view/buldak-vapor-kiyo-genshin-impact-genshin-gif-20112748",
                    "https://tenor.com/view/discord-reaction-gif-23868418",
                    "https://tenor.com/view/dono-wall-talking-wall-bricks-gif-17741481",
                    "https://tenor.com/view/kuroshitsuji-black-butler-gif-20422392",
                    "https://tenor.com/view/discord-japanese-goblin-speech-bubble-gif-25424326",
                    "https://tenor.com/view/furry-speech-bubble-gif-25272617",
                    "https://tenor.com/view/jxzy89-furry-dance-dog-necklace-gif-23851986",
                    "https://tenor.com/view/shoto-todoroki-anime-hearts-my-hero-academia-boku-no-hero-academia-gif-17332727"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("myhonestreaction")
        .setDescription("got the whole squad laughing"),
    execute: async({client, interaction}) => {
        const image = Math.floor(Math.random() * reactions.length);
        console.log("used in " + client.Guild);
        await interaction.reply(reactions[image]);
    }
}