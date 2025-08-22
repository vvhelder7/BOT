const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.systemChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("🎉 Novo membro!")
      .setDescription(`Seja muito bem-vindo(a), ${member}!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setImage("https://i.pinimg.com/736x/2d/1a/17/2d1a17f54b58ddc401279d4193af4bd6.jpg")
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    channel.send({ embeds: [embed] });
  },
};
