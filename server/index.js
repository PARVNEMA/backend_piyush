const http = require("http");
const fs = require("fs");
const url = require("url");
const myserver = http.createServer((req, res) => {
  if (req.url == "/favicon.ico") {
    res.end();
  }
  // console.log('new server started');
  // console.log(req.headers);
  const log = `${Date.now()} new req type ${req.method} received ${req.statusCode} \n`;
  const myurl = url.parse(req.url,true);
  // console.log(myurl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myurl.pathname) {
      case "/":
        res.end("<h1>Home</h1>");
        break;
      case "/about":
        const username=myurl.query.username;
        res.end(`name is ${username}`);
        break;
      case "/search":
        const searchr=myurl.query.search_result;
        res.end(`search is is ${searchr}`);
        break;
 case '/signup':
     if(req.method=== 'GET'){
      res.end('this is a signup form')
     }
     else if(req.method ==='POST'){
      // DB query
      res.end('success')
     }
     break;
      default:
        res.end("404");
        break;
    }
  });
});

myserver.listen(8000, () => console.log("server started"));
