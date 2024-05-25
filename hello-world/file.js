const fs = require("fs");
//sync
// fs.writeFileSync('./test.txt','hello world')

//async
// fs.writeFile('./test.txt','hello world',(err)=>{})

// const res=fs.readFileSync('./contacts.js','utf-8');
// console.log(res);

// fs.readFile('./contacts.js','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// })

// fs.appendFileSync('./test.txt',`hello world \n`)

// blocking code
console.log(1);
const res = fs.readFileSync("contacts.txt", "utf-8");
console.log(res);

console.log(2);

// non blocking
console.log(1);
fs.readFile("contacts.txt", "utf-8", (err, data) => {
    console.log(data);
});
console.log(2);
