import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import userRoute from "./routes/UserRoutes.mjs";
import todoRoute from "./routes/TodoRoutes.mjs";
import cors from 'cors'
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ka-igit",
    resave: false,
    saveUninitialized: false,
    isLoggedIn: false,
    user: '',
    cookie: { maxAge: 600000000000000 },
  }),
);
app.use(cookieParser());

app.use("/api/user/", userRoute);
app.use("/api/todo/", todoRoute);

app.get("/", (req, res) => {
  console.log(req.session);
  return res.status(200).send({ message: "api server is running" });
});

app.listen(8080, () => {
  console.log("server is running at port 8080");
});
