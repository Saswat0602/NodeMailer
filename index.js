import express from "express";
import morgan from "morgan";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import  twilio from "twilio";


dotenv.config();
const app = express();
const port = process.env.PORT ||  8000;

app.use(express.json());
app.use(morgan("common"));

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD,
  },
});
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
const otpCache = {}; // Use a cache to store OTPs temporarily

app.post("/api/send-email", (req, res) => {
  const { to, subject } = req.body;

  const otp = generateOTP();
  const text = `Your OTP is: ${otp}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      otpCache[to] = otp; 
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otpCache[email]) {
    return res.status(400).json({ error: "OTP not found or expired" });
  }

  if (otpCache[email] == otp) {
    delete otpCache[email]; 
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

app.post("/api/demo-mail", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});












const accountSid = "US5873180426fb7cbfe25238d8327b187c";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const twilioPhone = "9178842947";
const client = twilio(accountSid, authToken);

app.post("/api/send-otp", (req, res) => {
  const { phoneNumber } = req.body;

  const otp = generateOTP();

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: phoneNumber,
    })
    .then((message) => {
      console.log("OTP sent:", message.sid);
      otpCache[phoneNumber] = otp; // Save OTP in cache (replace phoneNumber with an identifier)
      res.status(200).json({ message: "OTP sent successfully" });
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    });
});





app.post("/api/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!otpCache[phoneNumber]) {
    return res.status(400).json({ error: "OTP not found or expired" });
  }

  if (otpCache[phoneNumber] == otp) {
    // OTP matches, valid
    delete otpCache[phoneNumber]; // Remove OTP from cache after successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
