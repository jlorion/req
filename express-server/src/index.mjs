import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).send({ message: "api server is running" });
});

app.listen(8080, () => {
  console.log("server is running at port 8080");
});
