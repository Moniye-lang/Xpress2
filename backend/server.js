const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject,
      text: message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.json({ success: false, msg: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});


app.listen(5000, () => console.log("✅ Server running on port 5000"));
