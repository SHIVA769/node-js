// import express from "express";
// import { MongoClient, ObjectId } from "mongodb";
// import path from "path";
// import { fileURLToPath } from "url";
// import bodyParser from "body-parser";

// const app = express();
// const port = 3000;

// // ===== MongoDB setup =====
// const url = "mongodb://localhost:27017";
// const dbName = "vfdfd";
// const client = new MongoClient(url);

// async function dbConnection() {
//   if (!client.topology?.isConnected()) {
//     await client.connect();
//     console.log("✅ Connected to MongoDB");
//   }
//   const db = client.db(dbName);
//   return db.collection("sdfds");
// }

// // ===== Middleware =====
// app.use(bodyParser.urlencoded({ extended: true }));

// // ===== EJS setup =====
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // ===== ROUTES =====

// // Home redirect
// app.get("/", (req, res) => res.redirect("/students"));

// // 📋 Display all students
// app.get("/students", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const students = await collection.find().toArray();
//     res.render("students", { students });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching data");
//   }
// });

// // 🆕 Show add form
// app.get("/add-student", (req, res) => res.render("add-student"));

// // 💾 Add student
// app.post("/add-student", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const { name, age, email } = req.body;
//     const now = new Date();
//     await collection.insertOne({ name, age: parseInt(age), email, sd: now });
//     console.log("✅ Student added:", name);
//     res.redirect("/students");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error saving data");
//   }
// });

// // 📝 Show edit form
// app.get("/edit-student/:id", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const id = req.params.id;
//     const student = await collection.findOne({ _id: new ObjectId(id) });
//     if (!student) {
//       return res.status(404).send("Student not found");
//     }
//     res.render("edit-student", { student });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error loading student");
//   }
// });

// // 🔁 Handle update submission
// app.post("/edit-student/:id", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const id = req.params.id;
//     const { name, age, email } = req.body;
//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: { name, age: parseInt(age), email } }
//     );

//     if (result.modifiedCount > 0) {
//       console.log(`✅ Updated student with ID: ${id}`);
//     } else {
//       console.log(`⚠️ No student updated for ID: ${id}`);
//     }
//     res.redirect("/students");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating student");
//   }
// });

// // 🗑️ Delete via POST form
// app.post("/delete-student/:id", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const id = req.params.id;
//     await collection.deleteOne({ _id: new ObjectId(id) });
//     console.log(`🗑️ Deleted student with ID: ${id}`);
//     res.redirect("/students");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting data");
//   }
// });

// // 🗑️ Delete via direct URL
// app.get("/ui/delete/:id", async (req, res) => {
//   try {
//     const collection = await dbConnection();
//     const id = req.params.id;
//     const result = await collection.deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount > 0) {
//       res.send("<h1>✅ Student record deleted</h1>");
//     } else {
//       res.send("<h1>⚠️ Student record not found</h1>");
//     }
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).send("Error deleting data");
//   }
// });

// app.listen(port, () =>
//   console.log(`🚀 Server running on http://localhost:${port}`)
// );

//////////////////////////////////////////////////////////////////////////////////////////
import mongoose from 'mongoose'
import express from 'express'
import studentModel from './model/studentModel.js';
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

await mongoose.connect("mongodb://localhost:27017/school").then(()=>{
    console.log("_______connected______");
})

// Home route - display all students
app.get("/",async (req,resp)=>{
    const studentData = await studentModel.find();
    resp.render("students", { students: studentData });
})

// Display students list
app.get("/students", async (req, resp) => {
    const studentData = await studentModel.find();
    resp.render("students", { students: studentData });
});

// Show add student form
app.get("/add-student", (req, resp) => {
    resp.render("add-student");
});

// Save new student
app.post("/add-student", async (req, resp) => {
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
        return resp.status(400).send("All fields are required");
    }
    const studentData = await studentModel.create({ name, age: parseInt(age), email });
    resp.redirect("/students");
});

// Show edit form
app.get("/edit-student/:id", async (req, resp) => {
    const student = await studentModel.findById(req.params.id);
    if (!student) {
        return resp.status(404).send("Student not found");
    }
    resp.render("edit-student", { student });
});

// Update student
app.post("/edit-student/:id", async (req, resp) => {
    const { name, age, email } = req.body;
    await studentModel.findByIdAndUpdate(req.params.id, { name, age: parseInt(age), email });
    resp.redirect("/students");
});

// Delete student
app.post("/delete-student/:id", async (req, resp) => {
    await studentModel.findByIdAndDelete(req.params.id);
    resp.redirect("/students");
});

// API route for saving student (as per original)
app.post("/save",async (req,resp)=>{
    console.log(req.body);
    const {name,age,email}= req.body;
if(!req.body || !name || !age || !email){
  resp.send({
        message:"data not stored",
        success:false,
        storedInfo:null
    })
    return false
}
    const studentData = await studentModel.create(req.body)

    resp.send({
        message:"data stored",
        success:true,
        storedInfo:studentData
    })

})

app.listen(3200, () => {
    console.log(`🚀 Server running on http://localhost:3200`);
})
