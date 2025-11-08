const fs  = require('fs');


// fs.writeFile("file.txt","Hello World!",(err)=>{
//     if(err) throw err;
//     console.log("File creauuuted");
// });

fs.readFile("file.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log("File data: ",data);
});
fs.appendFile("file.txt","\nAppended Text",(err)=>{
    if(err) throw err;
    console.log("File appended");
});
fs.readFile("file.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log("Updated File data: ",data);
});
fs.unlink("file.txt",(err)=>{
    if(err) throw err;
    console.log("File deleted");
});



fs.readFileSync("file.txt","utf8");
console.log("File read synchronously");