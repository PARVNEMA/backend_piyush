const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const Blog = require("./models/blog");
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => log("MongoDB connection error", err));

const userroute = require("./routes/user");
const blogroute = require("./routes/blog");
const { log } = require("console");

const {
    checkForAuthenticationCookie,
} = require("./middlewares/authentication");
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));
// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});

    return res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user", userroute);
app.use("/blog", blogroute);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
