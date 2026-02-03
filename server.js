import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("API is working perfectly! 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
