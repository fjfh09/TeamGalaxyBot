import { SlashCommandBuilder } from "@discordjs/builders";
import { PermissionsBitField } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

export default {
    data: new SlashCommandBuilder()
        .setName("setup_webhook")
        .setDescription("Configura el webhook de Brawl Stars Team Galaxy")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async run(client, int) {
        await int.deferReply({ ephemeral: true });

        try {
            const existing = await dbService.webhooks.get("SELECT * FROM webhookTG WHERE numero = 1");
            
            if (existing) {
                return int.editReply("⚠️ El Webhook ya está configurado.");
            }

            // Hardcoded channel ID from legacy command: 788056949992325191
            const channelId = "788056949992325191";
            const channel = await client.channels.fetch(channelId).catch(() => null);

            if (!channel) {
                return int.editReply("❌ No se encontró el canal especificado (788056949992325191).");
            }

            const webhook = await channel.createWebhook({
                name: 'Brawl Team Galaxy',
                avatar: 'https://cdn.discordapp.com/avatars/809790434838708224/929fb1f296a31f54f9eaea53b342b693.webp',
            });

            await dbService.webhooks.run("INSERT INTO webhookTG(numero, id, token) VALUES(1, ?, ?)", [webhook.id, webhook.token]);

            await int.editReply(`✅ Webhook creado en <#${channelId}>.`);

        } catch (error) {
            console.error(error);
            await int.editReply("❌ Error al configurar el webhook.");
        }
    }
};
