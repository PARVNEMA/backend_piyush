const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const fs = require("fs");
const { type } = require("os");
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://namannema0704:namanparvnema@cluster0.unysvvh.mongodb.net/",
    { dbName: "project-1" }
  )
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => console.log("Mongodb Connection error", err));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobtitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}; ${req.method} ${req.path} `,
    (err, data) => {
      next();
    }
  );
});
app.use((req, res, next) => {
  res.setHeader("X-name", "naman");
  console.log(req.headers);
  next();
});
app.get("/api/users", async (req, res) => {
  const dbusers = await user.find({});

  return res.json(dbusers);
});

app.get("/users", async (req, res) => {
  const dbusers = await user.find({});
  const html = `
    <ul>${dbusers
      .map((user) => `<li>Name:${user.firstName},  email:${user.email} </li>`)
      .join("")}</ul>`;
  res.send(html);
});

// app.route('/api/users/:id').get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   }).post((req, res) => {

//   }).patch((req,res)=>{})
//   .delete((req,res)=>{})

app.get("/api/users/:id", async (req, res) => {
  const use = await user.findById(req.params.id);
  if (!use) {
    return res.status(404).json({ err: "not found user" });
  }
  return res.json(use);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ status: "fail", message: "data missing" });
  }
  const result = await user.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobtitle: body.job_title,
  });

  return res.status(201).json({ msg: "success" });
});

app.patch("/api/users/:id", async (req, res) => {
  await user.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

  return res.json({ status: "changed" });
});
app.delete("/api/users/:id", async (req, res) => {
  await user.findByIdAndDelete(req.params.id);

  return res.json({ status: "deleted" });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
