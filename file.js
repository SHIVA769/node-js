import express from 'express';
 import userData from "./User.json" assert {type: "json"};
const app =express();
  const port =3000;
app.get("/", (req, resp) => {
  resp.send(userData);
});

  app.get("/user/:id", (req, resp) => {
  const id = parseInt(req.params.id);
  const user = userData.find((user) => user.id === id);
  if (user) {
    resp.json(user);
  } else {
    resp.status(404).json({ error: "User not found" });
  }
});
      app.listen (port,()=>{
          console.log(`server is running at http://localhost:${port}`);
      });
