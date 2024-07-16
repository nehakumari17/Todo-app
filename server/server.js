const express = require('express');
const cors = require("cors");
const app = express();
const api = require("./routes/api");
const todoRouter = require("./routes/todoRoute");
const connectDb = require("./utils/db");


const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/", api);
app.use("/api/", todoRouter);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  });
});
