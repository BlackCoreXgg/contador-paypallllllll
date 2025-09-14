const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // ✅ permite que tu web pueda leer los datos

// Cargar contador desde archivo o inicializar
let contador = { ventas: 0, compradores: 0 };
try {
  contador = JSON.parse(fs.readFileSync("contador.json", "utf8"));
} catch (err) {
  console.log("No se encontró contador.json, inicializando en 0.");
}

// Endpoint para ver el contador
app.get("/contador", (req, res) => {
  res.json(contador);
});

// Webhook de PayPal: cada pago suma +1
app.post("/webhook", (req, res) => {
  contador.ventas++;
  contador.compradores++;
  fs.writeFileSync("contador.json", JSON.stringify(contador));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));
