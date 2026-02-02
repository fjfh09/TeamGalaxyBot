import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("3enraya")
        .setDescription("Juega al 3 en Raya (Tic Tac Toe) contra el bot"),

    async run(client, int) {
        await int.deferReply();

        // Initial Board (0-8)
        let board = Array(9).fill(null);
        let playerTurn = true; // Player starts

        const getButtons = (board) => {
            const rows = [];
            for (let i = 0; i < 3; i++) {
                const row = new ActionRowBuilder();
                for (let j = 0; j < 3; j++) {
                    const idx = i * 3 + j;
                    const btn = new ButtonBuilder()
                        .setCustomId(`ttt_${idx}`)
                        .setStyle(board[idx] === 'X' ? ButtonStyle.Primary : board[idx] === 'O' ? ButtonStyle.Danger : ButtonStyle.Secondary)
                        .setLabel(board[idx] || ' ')
                        .setDisabled(board[idx] !== null);
                    row.addComponents(btn);
                }
                rows.push(row);
            }
            return rows;
        };

        const checkWin = (b) => {
            const lines = [
                [0,1,2], [3,4,5], [6,7,8], // rows
                [0,3,6], [1,4,7], [2,5,8], // cols
                [0,4,8], [2,4,6]           // diags
            ];
            for (let line of lines) {
                const [x, y, z] = line;
                if (b[x] && b[x] === b[y] && b[x] === b[z]) return b[x];
            }
            return b.every(cell => cell !== null) ? 'Tie' : null;
        };

        const embed = new EmbedBuilder()
            .setTitle("🎮 3 en Raya vs Bot")
            .setDescription("¡Tú eres las **X** (Azul)! Haz clic en un botón para jugar.")
            .setColor("Blue");

        const msg = await int.editReply({ embeds: [embed], components: getButtons(board) });

        const collector = msg.createMessageComponentCollector({ 
            componentType: ComponentType.Button, 
            time: 60000,
            filter: i => i.user.id === int.user.id
        });

        collector.on('collect', async i => {
            const idx = parseInt(i.customId.split('_')[1]);

            if (board[idx]) {
                return i.reply({ content: "Esa casilla ya está ocupada.", ephemeral: true });
            }

            // Player Move
            board[idx] = 'X';
            
            // Check Player Win
            let winner = checkWin(board);
            if (winner) {
                return endGame(i, winner);
            }

            // Bot Move (Random empty spot)
            const emptyIndices = board.map((v, k) => v === null ? k : null).filter(v => v !== null);
            if (emptyIndices.length > 0) {
                const botMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                board[botMove] = 'O';
            }

            // Check Bot Win
            winner = checkWin(board);
            if (winner) {
                return endGame(i, winner);
            }

            await i.update({ components: getButtons(board) });
        });

        const endGame = async (i, winner) => {
            let resultText = "";
            let color = "Green";
            if (winner === 'X') resultText = "🎉 ¡Ganaste!";
            else if (winner === 'O') { resultText = "🤖 El bot gana."; color = "Red"; }
            else { resultText = "⚖️ ¡Empate!"; color = "Grey"; }

            // Disable all buttons
            const rows = getButtons(board);
            rows.forEach(row => row.components.forEach(btn => btn.setDisabled(true)));

            const finalEmbed = new EmbedBuilder()
                .setTitle("🎮 3 en Raya - Fin del Juego")
                .setDescription(resultText)
                .setColor(color);
            
            await i.update({ embeds: [finalEmbed], components: rows });
            collector.stop();
        };

        collector.on('end', (_, reason) => {
            if (reason === 'time') {
                int.editReply({ content: "⏱️ Tiempo agotado.", components: [] }).catch(() => {});
            }
        });
    }
};