const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HRuezHkbzSCimCfJ7kHjfyXogOLSrUfVFOFqBiGxqL0OhBGQGH1ySWQBgffpr83AVQetioaiuBmFIsxwXQaP8LZ00MNVO8iiY"
);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents
    .create({
      amount: total,
      currency: "inr",
    })
    .then((intent) => {
      console.log(intent);
      response.status(201).send({
        clientSecret: intent.client_secret,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Listening on Port ::${PORT}`);
});
