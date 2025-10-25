require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/smileclub");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running with CORS enabled!");
});

// app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/login", require("./routes/auth"));
app.use("/api/form", require("./routes/registrations"));

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

