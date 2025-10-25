const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const ms = require("ms")
const { MessageFlags } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db_cartera = new sqlite3.Database("./BD/db_cartera.sqlite");

let ludopatia_caballos = new Set();

module.exports = {
    data: new SlashCommandBuilder()
    .setName("caballos")
    .setDescription("Apuesta a las carreras de caballos")
    .addIntegerOption(option =>
        option.setName("numero")
        .setDescription("Apuesta un caballo del 1 al 10")
        .setRequired(true)
    ),

    async run(client, int){

      let estructura = "__Forma de usar el comando:__ `/caballos numero:[número del caballo]`\n" + "```js\n" + "[] -> Obligatorio\n" + "() -> Opcional\n" + "{} -> Aclaración\n" + "```";

        let apuestacaballo = int.options.getInteger("numero")

        if(!apuestacaballo || apuestacaballo<1 || apuestacaballo>10 || isNaN(apuestacaballo)) return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`⛔ **Debes apostar a un caballo del 1 al 10**\n\n${estructura}`).setColor(0x95F5FC)], flags: MessageFlags.Ephemeral })

        if(ludopatia_caballos.has(int.member.id)) return int.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`⛔ **Debes esperar 1 minuto** ⛔`).setColor(0x95F5FC)], flags: MessageFlags.Ephemeral})
        ludopatia_caballos.add(int.member.id);
        setTimeout(() => { ludopatia_caballos.delete(int.member.id); }, 60000);

        let poderpremio;
        let numaleatorio6 = Math.round(Math.random()*(10-1))+1;

        let mensaje = await int.reply({ embeds: [new Discord.EmbedBuilder().setDescription(`**:one: / :seven:\n\n¡Y DA COMIENZO LA CARRERA! EL CABALLO NÚMERO ${Math.round(Math.random()*(10-1))+1} PARECE QUE HA DESAYUNADO BIEN ESTA MAÑANA**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]}).catch(err => console.log(err));
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:two: / :seven:\n\nSORPRENDENTEMENTE, EL CABALLO NÚMERO ${Math.round(Math.random()*(10-1))+1} TOMA LA VENTAJA Y SE ADELANTA EN UN SUSPIRO**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 5000);
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:three: / :seven:\n\n¿ES UN PÁJARO? ¿ES UN AVIÓN? MADRE MÍA CON EL CABALLO ${Math.round(Math.random()*(10-1))+1}, VA COMO UNA BALA.**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 10000);
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:four: / :seven:\n\nMITAD DE LA CARRERA Y LA SITUACION ES QUE EL CABALLO ${Math.round(Math.random()*(10-1))+1} VA EN 1º POSICION PERO LE PISAN LOS TALONES, NO HAY NADA CLARO...**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 15000);
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:five: / :seven:\n\nSOLO QUEDA UNA RECTA, PARECE QUE EL CABALLO NÚMERO ${Math.round(Math.random()*(10-1))+1} PUEDE SER EL VENCEDOR PERO NO ESTÁ TODO CLARO**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 20000);
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:six: / :seven:\n\n¡GALOPAN Y GALOPAN, CRUZAN LA META Y..... TENEMOS QUE RECURRIR A LA FOTO FINISH PARA VER QUIEN GANÓ!**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 25000);
  setTimeout(async function() {if(mensaje) mensaje.edit({ embeds: [new Discord.EmbedBuilder().setDescription(`**:seven: / :seven:\n\n¡FINALMENTE, TRAS REVISAR LA FOTO FINISH, EL CABALLO NUMERO ${numaleatorio6} ES QUIEN GANA LA CARRERA!**`).setThumbnail(int.user.displayAvatarURL({ dynamic: false })).setColor(0x95F5FC)]});}, 30000);
  setTimeout(async function() {
    let embed = new Discord.EmbedBuilder()
      .setDescription(`**:racehorse: __CARRERAS DE CABALLOS__ :racehorse:**\n\n:money_with_wings: **Tu apuesta fue:** ${apuestacaballo}\n:first_place: **Y el ganador es:** ${numaleatorio6}`)
      .setColor(0x95F5FC)
      .setThumbnail(int.user.displayAvatarURL({ dynamic: false }))
      .setTimestamp();
    if(mensaje) mensaje.edit({ embeds: [embed] });
    if(parseInt(apuestacaballo) === numaleatorio6){
      let cuadroS = new Discord.EmbedBuilder()
        .setDescription(`:star_struck: **HAS GANADO EN LAS CARRERAS DE CABALLOS**\n\n:confetti_ball: ¡ENHORABUENA! HAS GANADO **2000** MONEDAS`)
        .setColor(0x34d134)
      int.channel.send({ embeds: [cuadroS] })
      db_cartera.get(`SELECT * FROM usuarios WHERE id = ${int.member.id}`, async (err, filas) => {
        if(err) return console.log(err.int + ` ${int.content} ERROR #1 comando "caballos" => ${int.content}`)
        let sentencia;
        if(!filas) sentencia = `INSERT INTO usuarios(id, monedas) VALUES('${int.member.id}', ${2000})`;
        else sentencia = `UPDATE usuarios SET monedas = ${filas.monedas+(2000)} WHERE id = ${int.member.id}`

        db_cartera.run(sentencia, function(err) {
          if(err) return console.log(err.int + ` ${int.content} ERROR #2 comando "caballos" => ${int.content}`)
        })
      })
    }
    else{
      let cuadroS = new Discord.EmbedBuilder()
        .setDescription(`:anger: **PERDISTE TU TIEMPO TONTAMENTE, PERO SIGUE INTENTÁNDOLO...**`)
        .setColor('#d13434')
      int.channel.send({ embeds: [cuadroS]})
    }
  }, 35000);
    }
}