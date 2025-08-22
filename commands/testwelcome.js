const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testwelcome")
    .setDescription("Testa a mensagem de boas-vindas ou saída")
    .addStringOption(option =>
      option
        .setName("tipo")
        .setDescription("Qual mensagem deseja testar?")
        .setRequired(true)
        .addChoices(
          { name: "Entrada", value: "join" },
          { name: "Saída", value: "leave" }
        )
    ),

  async execute(interaction) {
    const tipo = interaction.options.getString("tipo");

    if (tipo === "join") {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("🎉 Novo membro!")
        .setDescription(`Seja muito bem-vindo(a), ${interaction.user}!`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `ID: ${interaction.user.id}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }

    if (tipo === "leave") {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("👋 Um membro saiu")
        .setDescription(`**${interaction.user.tag}** deixou o servidor.`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `ID: ${interaction.user.id}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};
