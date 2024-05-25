const express = require("express");
const app = express();

app.get("/", (req, res) => {
   return res.send("hello duniya");
});

app.get("/about",(req,res)=>{
    return res.send('about page hi '+ req.query.name);
})

app.listen(8000, () => {
  console.log("server started");
});

