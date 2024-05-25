const express = require("express");
const app = express();
const { connectmongodb } = require("./connections");

const PORT = 8000;

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

connectmongodb(
  "mongodb+srv://namannema0704:namanparvnema@cluster0.unysvvh.mongodb.net/"
).then(() => console.log("mongodb connected"));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});
app.use(logReqRes("log.txt"));

app.use((req, res, next) => {
  res.setHeader("X-name", "naman");
  console.log(req.headers);
  next();
});

app.use("/api/user", userRouter);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
