const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = require("quick.db")
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const config = require("../config.json")
module.exports = {
    name: "set", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
        if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌ | **Você não está na lista de pessoas!**`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
                message.delete();
                if(!args[0]) return message.channel.send("coloque um produto ao lado")
                if(!db.get(args[0])) return message.channel.send("produto não existe")
        const row = new Discord.MessageActionRow()               
        .addComponents(
            new Discord.MessageButton()
                .setCustomId(args[0])
                .setLabel('Comprar')
                .setEmoji('<:CarrinhoSWT:1063851019395674253>')
                .setStyle('SUCCESS'),
        );
const embed = new Discord.MessageEmbed()
.setTitle(`${dbB.get(`nomebot`)} | Produto`)
    .setDescription(`\`\`\`${db.get(`${args[0]}.desc`)}\`\`\`\n🛒 | **Nome:** **__${db.get(`${args[0]}.nome`)}__**\n💵 | **Preço:** **__R$${db.get(`${args[0]}.preco`)}__**\n🗃 | **Estoque:** **__${db.get(`${args[0]}.conta`).length}__**`)
.setColor(`${dbB.get(`cor`)}`)
.setFooter("Para comprar clique no botão abaixo.")
.setThumbnail(`${dbB.get(`foto`)}`)
.setImage(`${dbB.get(`banner`)}`)
message.channel.send({embeds: [embed], components: [row]})

    }
}
