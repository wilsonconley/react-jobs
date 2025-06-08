const express = require("express");
const cors = require("cors");

let data = require("./jobs.json");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/jobs", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(data.slice(0, limit));
  } else {
    res.json(data);
  }
});

app.get("/jobs/:id", (req, res) => {
  const id = req.params.id;
  res.json(data.find((el) => el.id === id));
});

app.post("/jobs", express.json(), (req, res) => {
  const newId = Math.max(...data.map((job) => job.id)) + 1;
  data.push({ ...req.body, ...{ id: String(newId) } });
  res.send(`${newId}`);
});
