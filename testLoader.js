const { loadFiles } = require("./Functions/fileLoader");

loadFiles("Events").then((files) => {
    console.log("Archivos cargados:", files);
}).catch((err) => {
    console.error("Error cargando archivos:", err);
});
