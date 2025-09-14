import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

let ventas = 0;
let compradores = new Set();

// Webhook de PayPal
app.post("/webhook/paypal", (req, res) => {
  const pago = req.body;

  if (pago.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    ventas++;
    compradores.add(pago.resource.payer.email_address);
    console.log("✅ Pago recibido:", pago.resource.payer.email_address);
  }

  res.sendStatus(200);
});

// Endpoint para la web
app.get("/contador", (req, res) => {
  res.json({
    ventas,
    compradores: compradores.size
  });
});

// Puerto dinámico (Render elige el puerto con la variable de entorno PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
