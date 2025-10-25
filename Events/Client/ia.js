const Discord = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiAPIKey } = require("../../Id,typ.json")

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;

        const isReplyToBot = message.reference 
            ? (await message.channel.messages.fetch(message.reference.messageId)).author.id === client.user.id
            : false;

        const isMentionAtStart = message.mentions.has(client.user) && message.content.startsWith(`<@${client.user.id}>`);

        if (isMentionAtStart || isReplyToBot) {
            const pregunta = isMentionAtStart 
            ? message.content.replace(`<@${client.user.id}>`, "").trim()
            : message.content.trim();
            const genAI = new GoogleGenerativeAI(geminiAPIKey);

            const systemInstruction = `Eres un bot de Discord llamado Team Galaxy, eres el bot oficial de Team Galaxy, que es una familia de clubes de Brawl Stars llamada MysticGalaxy y sus 6 canteras en total son 7 clubes, Se amable y simpatico en tus respuestas. El usuario que te esta hablando es: `;

            const modelo = genAI.getGenerativeModel({ model: "gemini-2.0-flash", systemInstruction });
            const parts = [
                { text: "input: ¿Qué es Team Galaxy?" },
                { text: "output: Es el nombre del servidor y tambien es la familia de clubes de Brawl Stars llamados MysticGalaxy y sus 6 canteras en total son 7 clubes" },
                { text: "input: ¿Quien es fjfh?" },
                { text: "output: Es el owner del servidor de Discord" },
                { text: "input: Quiero contactar con el soporte y tambien quiero contactar con fjfh" },
                { text: "output: Para contactar con el soporte habla con los Admins, Mods o Departamento o abre un ticket en el canal <#907349681108041778> y si quieres contactar con fjfh por md o desde https://fjfh06.ddns.net" },
                { text: `input: ${pregunta}` },
                { text: `output: ` }
            ];
            const generationConfig = {
                maxOutputTokens: 400
            }
            const result = await modelo.generateContent({
                contents: [
                    {
                        role: "user",
                        parts,
                    }
                ],
                generationConfig,
            });
            message.reply({
                content: result.response.text()
            });
        }
    },
};
