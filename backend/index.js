import express from "express";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());




app.use(express.json());

app.post("/send-email", (req, res) => {
  sendEmail();
  res.send("Email sent!");
});




const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
