const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        // ID do cargo que você quer dar
        const roleId = "1407832890938757171"; 

        // tenta pegar o cargo
        const role = member.guild.roles.cache.get(roleId);

        if (!role) {
            console.log("❌ Cargo não encontrado.");
            return;
        }

        try {
            await member.roles.add(role);
            console.log(`✅ Dei o cargo ${role.name} para ${member.user.tag}`);
        } catch (error) {
            console.error("Erro ao dar cargo:", error);
        }
    },
};
