module.exports = {
  apps: [{
    name: "TeamGalaxyBot",
    script: "./index.js",
    // Usamos tsx como intérprete para soportar tanto JS como TS nativamente sin compilar
    interpreter: "./node_modules/.bin/tsx",
    // Importante para que detecte bien los cambios y reinicie si quieres (opcional: watch: true)
    watch: false,
    env: {
      NODE_ENV: "production",
    }
  }]
};
