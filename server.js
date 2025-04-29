require('dotenv').config();

const connectDB = require("./middleware/midcon");
const chatRoute = require("./routes/chat");
const { app, server } = require("./socket"); 
const express = require("express")

const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(connectDB)

app.use("/api/chat", chatRoute);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
