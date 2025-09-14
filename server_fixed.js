import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Función para leer el contador
function leerContador() {
  try {
    const data = fs.readFileSync("contador.json", "utf8");
    return JSON.parse(data);
  } catch {
    return { ventas: 0, compradores: 0 };
  }
}

// Función para guardar el contador
function guardarContador(contador) {
  fs.writeFileSync("contador.json", JSON.stringify(contador, null, 2));
}

// Endpoint que PayPal va a llamar cuando entra un pago
app.post("/webhook", (req, res) => {
  let contador = leerContador();
  contador.ventas += 1;
  contador.compradores += 1; // Podés ajustar lógica si querés únicos
  guardarContador(contador);
  res.sendStatus(200);
});

// Endpoint para consultar el contador
app.get("/contador", (req, res) => {
  let contador = leerContador();
  res.json(contador);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

