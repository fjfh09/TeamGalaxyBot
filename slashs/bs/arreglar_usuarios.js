import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageFlags, PermissionsBitField } from "discord.js";

const rolesAEliminar = [
  "690525769600073788", "699966708290420807", "782560016690839583", "701142143988793445",
  "782558135638032385", "706861891292758116", "782560143090516020", "700328143394832435",
  "782558540664799254", "739819941020172328", "782560398238810122", "739819152130441278",
  "782558944362496021", "740612981804630077", "782560566136799233", "743136692172619848",
  "891633509783977984", "891633442687688734", "891633459196473364", "891633479907962900",
  "891633573017296916", "891633614809366559", "891633653078167602", "891633655200501772",
  "913145163545731073", "913144999330316288", "913144888374198344", "913144606386950144", 
  "910183222833467523", "1265036668893794385", "690527183910862879"
];
const rolVerificado = "1253637489256693820";

export default {
  data: new SlashCommandBuilder()
    .setName("arreglar_todos")
    .setDescription("Limpia roles de Brawl Stars de usuarios no verificados")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, int) {
    if (int.guild.id !== process.env.IDSERVER) {
      return int.reply({ content: "Este comando solo debe usarse en el servidor principal.", flags: MessageFlags.Ephemeral });
    }

    await int.deferReply({ flags: MessageFlags.Ephemeral });
    await int.editReply({ content: "⏳ Iniciando revisión de roles..." });

    try {
        const members = await int.guild.members.fetch();
        let affected = 0;

        for (const member of members.values()) {
            const tieneRolAEliminar = rolesAEliminar.some(roleId => member.roles.cache.has(roleId));
            const tieneRolVerificado = member.roles.cache.has(rolVerificado);

            if (tieneRolAEliminar && !tieneRolVerificado) {
                try {
                    await member.roles.remove(rolesAEliminar);
                    affected++;
                } catch (err) {
                    console.warn(`No se pudieron eliminar roles a ${member.user.tag}`);
                }
            }
        }

        await int.editReply({ content: `✅ Proceso completado. Se han corregido roles a **${affected}** usuarios.` });
    
    } catch (e) {
        console.error(e);
        await int.editReply({ content: "❌ Ocurrió un error duranto el proceso." });
    }
  }
};
