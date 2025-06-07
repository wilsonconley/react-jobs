const express = require("express");
const cors = require("cors");

const data = require("./jobs.json");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.json(data);
});
