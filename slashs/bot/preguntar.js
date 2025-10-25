const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const {GoogleGenerativeAI} = require("@google/generative-ai");
const { geminiAPIKey} = require("../../Id,typ.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("preguntar")
    .setDescription("Ha una pregunta a la IA")
    .addStringOption(option =>
        option.setName("pregunta")
           .setDescription("La pregunta que quiere consultar")
           .setRequired(true)
    ),

    async run(client, int){
        await int.deferReply();
        const pregunta = int.options.getString("pregunta");
        const genAI = new GoogleGenerativeAI(geminiAPIKey);

        const systemInstruction = `Se amable y simpatico en tus respuestas, Debes responder a todo lo que te pregunten. El usuario que te esta hablando es: ${int.user.displayName}`;

        const modelo = genAI.getGenerativeModel({model: "gemini-2.0-flash", systemInstruction});
        const parts = [
            {text: `input: Responde a todo`},
            {text: `output: Debes saber todo lo que te pregunten y responder`},
            {text: `input: ${pregunta}`},
            {text: `output: `}
        ];
        const generationConfig = {
            maxOutputTokens:400
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
        int.editReply({
            content: result.response.text()
        });
    }
}