const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Approach = require("./models/Approach");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/approachesDB",{
}).then(()=> console.log("MongoDB connected"))
.catch((err)=> console.log("Error occured connecting database",err));

app.post("/submit-approach",async (req,res)=> {
    console.log("Recived data : ",req.body);
    try {
    const newApproach = new Approach(req.body);
    await newApproach.save();
    res.status(200).json({ message: "Approach submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err });
  }
})
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
