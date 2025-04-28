const { app, server } = require("./socket"); 

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.use("/chat", require("./socket/routes/chat"));

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
