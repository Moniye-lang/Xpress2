import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend is running fine!");
});

// Email route
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: `Xpress2 Contact <onboarding@resend.dev>`,
      to: process.env.EMAIL_USER, // your email
      subject,
      text: `${name} (${email}) says: ${message}`,
    });

    console.log("✅ Email sent:", data);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.json({ success: false, msg: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
