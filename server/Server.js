const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5003; 
app.use(cors());
app.use(express.json()); 
const MONGO_URI = "mongodb+srv://praveengk2023ece:Praveen@cluster0.ytir7.mongodb.net/users?retryWrites=true&w=majority"; 
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  departure: String,
  arrival: String,
  busNumber: String,
  date: String,
  time: String,
});
const User = mongoose.model("User", UserSchema);
app.post("/users", async (req, res) => {
  try {
    const { name, email, phone, departure, arrival, busNumber, date, time } = req.body;
    if (!name || !email || !phone || !departure || !arrival || !busNumber || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
});
const buses = [
  { id: 1, name: "Bus A", students: 50, driver: "John ", contact: "1234567890" },
  { id: 2, name: "Bus B", students: 40, driver: "Smith", contact: "9876543210" },
];
app.get("/buses", (req, res) => {
  res.json(buses);
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});