const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("narrar")
        .setDescription("Narra uma mensagem em estilo embed.")
        .addStringOption(option =>
            option.setName("texto")
                .setDescription("O que você quer que o bot narre?")
                .setRequired(true)
        ),

    async execute(interaction) {
        const texto = interaction.options.getString("texto");

        const embed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setAuthor({ name: "📖 Narrador" })
            .setDescription(`*${texto}*`)
            .setFooter({ text: `Pedido por ${interaction.user.username}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
