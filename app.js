     

const express = require('express');
const app = express();
// parse application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const age = 45;
const userData = require('./SimpleApi.js');

app.get('/', (req, res) => {
    res.send("vxcvp");
});

app.get('/users', (req, res) => {
    res.json({ users: ["user1", "user2", "user3"] });
});
app.get('/data',(req,res)=>{
     res.json(userData)
})
app.get('/age',(req,res)=>{
        res.json({age:age})
      
        
})

// POST route to receive form submissions from /html/web.html (action="/submit")
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const newUser = { name, email };
  // append to in-memory userData array (SimpleApi.js export)
  if (Array.isArray(userData)) {
    userData.push(newUser);
  }

  // respond with the created user and the updated list
  res.json({ success: true, user: newUser, users: userData });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
