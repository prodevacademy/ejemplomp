import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";

// Agrega credenciales

const client = new MercadoPagoConfig({ accessToken: '' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Soy el servidor");
});

// Fixed the route path here
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "USD",
        },
      ],
      back_urls: {
        success: "",
        failure: "",
        pending: "",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
