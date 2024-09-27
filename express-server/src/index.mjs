import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import userRoute from "./routes/UserRoutes.mjs";
import todoRoute from "./routes/Todos.mjs";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ka-igit",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000000000000 },
  }),
);
app.use(cookieParser());

app.use("/api/user/", userRoute);

app.get("/", (req, res) => {
  return res.status(200).send({ message: "api server is running" });
});

app.listen(8080, () => {
  console.log("server is running at port 8080");
});
