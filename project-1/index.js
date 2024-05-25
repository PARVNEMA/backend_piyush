const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));

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
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>${users.map((user) => `<li>${user.first_name} </li>`).join("")}</ul>`;
  res.send(html);
});

// app.route('/api/users/:id').get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   }).post((req, res) => {

//   }).patch((req,res)=>{})
//   .delete((req,res)=>{})

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ err: "not found user" });
  }
  return res.json(user);
});

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  const us = users.filter((use) => use.id !== id);
  const body = req.body;
  us.push({ ...body, id: id });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(us), (err, data) => {
    return res.json({ status: "success", id: us.length });
  });
});
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.filter((use) => use.id !== id);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
    return res.json({ status: "success" });
  });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
