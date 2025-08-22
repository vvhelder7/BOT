const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true, // executa apenas uma vez
    execute(client) {
        console.log(`✅ Bot conectado como ${client.user.tag}`);

        // Define presença do bot (status)
        client.user.setPresence({
            activities: [{ name: "gerenciando fichas de RP 📝", type: 0 }], // type 0 = jogando
            status: "online", // online | idle | dnd | invisible
        });
    },
};
