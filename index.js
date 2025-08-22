require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Debug: conferir se pegou as variáveis
console.log("🚀 Iniciando bot...");
console.log("TOKEN:", process.env.DISCORD_TOKEN ? "✅ OK" : "❌ Não encontrado");
console.log("MONGO:", process.env.MONGO_URI ? "✅ OK" : "❌ Não encontrado");

// Criar cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// Carregar comandos da pasta ./commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Comando carregado: ${command.data.name}`);
    } else {
        console.warn(`⚠️ Arquivo do comando em ${filePath} está faltando "data" ou "execute".`);
    }
}

// Evento de login
client.once("ready", async () => {
    console.log(`🤖 Bot online como ${client.user.tag}`);

    const clientId = "1407788431802892430"; // ✅ Seu Client ID
    const token = process.env.DISCORD_TOKEN;

    const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log(`🔁 Registrando ${commands.length} comandos globalmente...`);
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log(`✅ Registrados ${commands.length} comandos globalmente!`);
    } catch (error) {
        console.error("❌ Erro ao registrar comandos:", error);
    }
});

// Handler de comandos
client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`⚠️ Comando não encontrado: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Erro ao executar o comando ${interaction.commandName}:`, error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "❌ Ocorreu um erro ao executar esse comando.", ephemeral: true });
        } else {
            await interaction.reply({ content: "❌ Ocorreu um erro ao executar esse comando.", ephemeral: true });
        }
    }
});

// Conectar no MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("📦 Conectado ao MongoDB!");
}).catch(err => {
    console.error("❌ Erro no MongoDB:", err);
});

// Logar no Discord
client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error("❌ Erro ao logar no Discord:", err);
});
