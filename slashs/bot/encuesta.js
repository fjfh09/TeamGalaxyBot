const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("encuesta")
    .setDescription("Crear una encuesta")
    .addStringOption(option =>
        option.setName("pregunta")
        .setDescription("Pon tu pregunta de la encuesta")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("opcion_a")
        .setDescription("Pon la primera opcion")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("opcion_b")
        .setDescription("Pon la segunda opcion")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("opcion_c")
        .setDescription("Pon la tercera opcion")
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName("opcion_d")
        .setDescription("Pon la cuarta opcion")
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName("opcion_e")
        .setDescription("Pon la quinta opcion")
        .setRequired(false)
    ),

    async run(client, int){

        let user = int.member;

        const pregunta = int.options.getString("pregunta")
      const opcion_a = int.options.getString("opcion_a")
      const opcion_b = int.options.getString("opcion_b")
      const iopcion_c = int.options.getString("opcion_c")
      const iopcion_d = int.options.getString("opcion_d")
      const iopcion_e = int.options.getString("opcion_e")

    let opcion_c;
      if (int.options.getString("opcion_c")) {
        opcion_c = `:regional_indicator_c: ${iopcion_c}`
    }else{
        opcion_c = ""
    }

    let opcion_d;
      if (int.options.getString("opcion_d")) {
        opcion_d = `:regional_indicator_d: ${iopcion_d}`
    }else{
        opcion_d = ""
    }
    let opcion_e;
      if (int.options.getString("opcion_e")) {
        opcion_e = `:regional_indicator_e: ${iopcion_e}`
    }else{
        opcion_e = ""
    }

        await int.deferReply()
        const embed = new Discord.EmbedBuilder()
        .setTitle(`📊 **${pregunta}**`)
       .setDescription(`:regional_indicator_a: ${opcion_a}\n:regional_indicator_b: ${opcion_b}\n${opcion_c}\n${opcion_d}\n${opcion_e}`)
       .setColor(0x0A69CF)
       .setFooter({text: 'Creado por fjfh'})
        int.editReply({ embeds: [embed]}).then(msg => {

            msg.react("🇦")
            msg.react("🇧")
    
          if (int.options.getString("opcion_c")) {
            msg.react("🇨")
        }else{
        }
    
          if (int.options.getString("opcion_d")) {
            msg.react("🇩")
        }else{
        }
    
          if (int.options.getString("opcion_e")) {
            msg.react("🇪")
        }else{
        }
          })
          
    }
}