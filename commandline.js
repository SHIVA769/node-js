const express = require('express');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const app = express();
const port = 3000;


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'web.html'));
// });

// app.post('/submit', (req, res) => {
//   let dataBody = [];
//   req.on("data", (chunk) => {
//     dataBody.push(chunk);
//   });
  
//   req.on("end", () => {
//     let rawData = Buffer.concat(dataBody).toString();
//     let readableData = querystring.parse(rawData);
//     console.log('Parsed form data:', readableData);
//     console.log('Raw POST body:', rawData);

//     // build a simple text string and write it to text/<name>.txt
//     const dataString =
//       'My name is ' + readableData.name + ' and my email is ' + readableData.email;

//     // ensure the target folder exists
//     const outDir = path.join(__dirname, 'text');
//     try {
//       fs.mkdirSync(outDir, { recursive: true });
//       fs.writeFileSync(path.join(outDir, `${readableData.name}.txt`), dataString, 'utf8');
//       console.log('File Created');
//     } catch (err) {
//       console.error('Failed to write file:', err && err.message);
//     }

//     // readableData will be an object like { name: 'value', email: 'value' }
//     res.send(`Form received: ${readableData.name} (${readableData.email})`);
//   });
// });
//  // simple response - in your app you might save this to a DB or in-memory array
//   // res.send(`Received submission: ${name} (${email})`);

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


// const express = require('express');
// const  app =express();
//  const agv = process.argv;
//    const port = agv[2] ;
//     app.get('/',(req,res)=>{
//         res.send("Hello World!");
//     });

//     app.listen(port,()=>{
//         console.log(`Server is running at http://localhost:${port}`);
//     });




// const express = require('express');
// const app = express();
// const port = 3000;
// const age = 45;
// const userData = require('./SimpleApi.js');

// app.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.write(`
//       <form action="/submit" method="POST">
//         <input type="text"  placeholder="Enter username" name="name" />
//         <input type="text"  placeholder="Enter email" name="email" />
//         <button>Submit</button>
//       </form>
//     `);
          
//     res.end();        
// })





// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

