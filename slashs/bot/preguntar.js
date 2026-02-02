import { SlashCommandBuilder } from "@discordjs/builders";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPIKey = process.env.GEMINI_API_KEY;

export default {
    data: new SlashCommandBuilder()
        .setName("preguntar")
        .setDescription("Haz una pregunta a la IA (Gemini)")
        .addStringOption(option =>
            option.setName("pregunta")
                .setDescription("Tu consulta")
                .setRequired(true)
        ),

    async run(client, int) {
        if (!geminiAPIKey) {
            return int.reply({ content: "❌ La API Key de Gemini no está configurada.", ephemeral: true });
        }

        await int.deferReply();
        const pregunta = int.options.getString("pregunta");

        try {
            const genAI = new GoogleGenerativeAI(geminiAPIKey);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash",
                systemInstruction: `Eres un asistente útil y amable de Team Galaxy. Responde concisamente. Usuario: ${int.user.displayName}`,
            });

            const result = await model.generateContent(pregunta);
            const response = result.response.text();

            let finalResponse = response;
            if (response.length > 2000) {
                finalResponse = response.substring(0, 1990) + "... (truncado)";
            }

            await int.editReply(finalResponse);

        } catch (error) {
            console.error("Gemini Error:", error);
            await int.editReply("❌ Ocurrió un error al consultar a la IA.");
        }
    }
};