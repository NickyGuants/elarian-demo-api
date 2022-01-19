const { Elarian } = require("elarian");
require("dotenv").config();
const express = require("express");

const client = new Elarian({
  orgId: process.env.ORG_ID,
  appId: process.env.APP_ID,
  apiKey: process.env.API_KEY,
});

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  client
    .on("connected", async () => {
      const { name, age, course, number } = req.body;
      const nick = new client.Customer({
        number: number,
        provider: "cellular",
      });
      await nick.updateMetadata({ name, age, course });
      res.status(200).send(await nick.getMetadata());
    })
    .connect();
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
