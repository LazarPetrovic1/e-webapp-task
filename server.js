const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

// Database connect
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
