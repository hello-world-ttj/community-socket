const chatRoute = require("./routes/chat");
const { app, server } = require("./socket");

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(" API is running...");
});

app.use("/chat", chatRoute)

server.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});