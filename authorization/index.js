const express = require("express");
const app = express();
const urlroute = require("./routes/url");
const Url = require("./models/url");
const { connectmongoose } = require("./connection");
const path = require("path");
const StaticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restricTo } = require("./middlewares/auth");
const PORT = 8000;

connectmongoose(
  "mongodb+srv://namannema0704:namanparvnema@cluster0.unysvvh.mongodb.net/urlshortner"
)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongodb connection Error", err));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(checkForAuthentication);
app.use("/url", restricTo(["NORMAL", "ADMIN"]), urlroute);

app.use("/user", userRoute);
app.use("/", StaticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`server is running at post ${PORT}`);
});
