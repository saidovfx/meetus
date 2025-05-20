const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes"); 

const app = express();

app.use(cors());
app.use(express.json());

// Route'lar
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.error("MongoDB xatolik:", err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Serverni ishga tushurish
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
