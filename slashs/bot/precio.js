import { SlashCommandBuilder } from "@discordjs/builders";

export default {
    data: new SlashCommandBuilder()
        .setName("precio")
        .setDescription("Consulta el precio de un producto específico (Demo)"),

    async run(client, int) {
        await int.deferReply();

        try {
            const response = await fetch('https://www.pccomponentes.com/api/articles/10810270/buybox');
            if (!response.ok) throw new Error("API Error");
            
            const data = await response.json();
            const price = data.originalPrice;

            await int.editReply(`💻 El precio del **MSI Katana 15** en PC Componentes es **${price}€**.\n🔗 [Ver Producto](https://www.pccomponentes.com/msi-katana-15-b13vfk-1854xes-intel-core-i7-13700h-16gb-1tb-ssd-rtx-4060-156)`);

        } catch (error) {
            console.error('Error precio:', error);
            await int.editReply('❌ No se pudo obtener el precio en este momento.');
        }
    }
};