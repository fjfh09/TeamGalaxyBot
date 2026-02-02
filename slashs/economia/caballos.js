import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { dbService } from "../../Services/DatabaseService.js";

const raceCooldowns = new Set();
const delay = ms => new Promise(res => setTimeout(res, ms));

export default {
    data: new SlashCommandBuilder()
        .setName("caballos")
        .setDescription("Apuesta a las carreras de caballos (1-10)")
        .addIntegerOption(option =>
            option.setName("numero")
                .setDescription("Número del caballo (1-10)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10)
        ),

    async run(client, int) {
        if (raceCooldowns.has(int.user.id)) {
            return int.reply({ 
                content: "⏳ Debes esperar 1 minuto entre carreras.", 
                ephemeral: true 
            });
        }

        const betHorse = int.options.getInteger("numero");
        raceCooldowns.add(int.user.id);
        setTimeout(() => raceCooldowns.delete(int.user.id), 60000);

        // Fetch user balance first
        // Note: The original code didn't check balance before playing (infinite money glitch?), it just gave money on win.
        // I'll keep the logic of "Free to play, win reward" for now unless user asked for economy system.
        // But usually gambling requires a bet. The original command takes "numero" but not "amount". 
        // So it's free to play, win 2000. Which explains the cooldown.

        await int.reply({ 
            embeds: [new EmbedBuilder()
                .setDescription(`**:one: / :seven:\n\n¡COMIENZA LA CARRERA! EL CABALLO ${Math.floor(Math.random()*10)+1} SALE CON FUERZA!**`)
                .setThumbnail(int.user.displayAvatarURL())
                .setColor(0x95F5FC)
            ]
        });

        const steps = [
            { stage: ":two:", text: "TOMA LA VENTAJA Y SE ADELANTA" },
            { stage: ":three:", text: "VA COMO UNA BALA" },
            { stage: ":four:", text: "VA EN 1º POSICIÓN PERO LE PISAN LOS TALONES" },
            { stage: ":five:", text: "SOLO QUEDA UNA RECTA" },
            { stage: ":six:", text: "¡CRUZAN LA META! FOTO FINISH..." }
        ];

        for (const step of steps) {
            await delay(5000);
            const randomHorse = Math.floor(Math.random() * 10) + 1;
            await int.editReply({
                embeds: [new EmbedBuilder()
                    .setDescription(`**${step.stage} / :seven:\n\n${step.text} (CABALLO ${randomHorse})**`)
                    .setThumbnail(int.user.displayAvatarURL())
                    .setColor(0x95F5FC)
                ]
            });
        }

        await delay(5000);
        const winner = Math.floor(Math.random() * 10) + 1;

        const resultEmbed = new EmbedBuilder()
            .setDescription(`**:racehorse: __RESULTADOS__ :racehorse:**\n\n:ticket: **Tu caballo:** ${betHorse}\n:first_place: **Ganador:** ${winner}`)
            .setColor(0x95F5FC)
            .setThumbnail(int.user.displayAvatarURL())
            .setTimestamp();
        
        await int.editReply({ embeds: [resultEmbed] });

        if (betHorse === winner) {
            const winEmbed = new EmbedBuilder()
                .setDescription(`:star_struck: **¡HAS GANADO!**\n\n:confetti_ball: Recibes **2000** Monedas`)
                .setColor(0x34d134);
            
            await int.followUp({ embeds: [winEmbed] });

            try {
                const user = await dbService.cartera.get("SELECT * FROM usuarios WHERE id = ?", [int.member.id]);
                if (!user) {
                    await dbService.cartera.run("INSERT INTO usuarios(id, monedas) VALUES(?, ?)", [int.member.id, 2000]);
                } else {
                    await dbService.cartera.run("UPDATE usuarios SET monedas = monedas + 2000 WHERE id = ?", [int.member.id]);
                }
            } catch (err) {
                console.error("DB Error Caballos:", err);
            }
        } else {
            const loseEmbed = new EmbedBuilder()
                .setDescription(`:anger: **¡Has perdido! Sigue intentándolo...**`)
                .setColor('#d13434');
            await int.followUp({ embeds: [loseEmbed] });
        }
    }
};