const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

module.exports = {
    name: "configbot", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌ | **Você não está na lista de pessoas!**`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
       
      const chave = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('nomebot')
            .setEmoji('🔁')
            .setLabel('Nome do bot')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('minchave')
            .setEmoji('🔁')
            .setLabel('Cargo Cliente')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctchave')
            .setEmoji('🔁')
            .setLabel('Cor Embed')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokendomp')
            .setEmoji('🔁')
            .setLabel('Token MP')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relchave')
            .setEmoji('🔁')
            .setLabel('Atualizar')
            .setStyle('PRIMARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o BOT`)
          .setDescription(`
          🔁| **Nome do bot:** ***${db.get(`nomebot`)}***
          🔁 | **Cargo Cliente:** <@&${db.get(`cargo`)}>
          🔁 | **Token MP:** || ${db.get(`acesstoken`)} ||
          🔁 | **Cor Embed:** ${db.get(`cor`)}`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(`${db.get(`cor`)}`)], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delchave") {
           msg.delete()
             msg.channel.send("✅ | Excluido!")
           db.delete(`${chave}`)
         }
         if (interaction.customId === "nomebot") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o nome do Bot").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`nomebot`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === "tokendomp") {
          interaction.deferUpdate();
          msg.channel.send("❓ | Qual o token do MP ?").then(msg => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              db.set(`acesstoken`, `${message.content}`)
              msg.edit("✅ | Token Alterado!")
          })
        })
      }
         if (interaction.customId === "minchave") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o cargo de cliente? (mande o id)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`cargo`, `${message.content.replace(",", ".")}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctchave') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a cor da embed? (ex: #00ff00)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`cor`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relchave') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
           .setTitle(`Bot Store | Configurando o BOT`)
             .setDescription(`
             🔁 | **Nome do bot:** ***${db.get(`nomebot`)}***
             🔁 | **Cargo Cliente:** <@&${db.get(`cargo`)}>
             🔁 | **Token MP:** || ${db.get(`acesstoken`)} ||
             🔁 | **Cor Embed:** ${db.get(`cor`)}`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(`${db.get(`cor`)}`)
           msg.edit({ embeds: [embed] })
           message.channel.send("✅ | Atualizado!")
             }
           })
         }
       }