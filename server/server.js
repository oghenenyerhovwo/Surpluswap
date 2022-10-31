// Requiring node modules
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import apiRouter from "./api/index.js"

// importing functions
import databaseConnection from "./connections/dbConnection.js"; 

// Initializing express
dotenv.config()
const app = express();
databaseConnection()

app.use(cors())
app.use(express.json())


// router implementations
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server is running")
});


// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Project server is running at http://localhost:${port}`)
})
