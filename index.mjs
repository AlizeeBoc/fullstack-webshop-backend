import express from "express"
const app = express()
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import indexRouter from "./routes/index.mjs"

//if (process.env.NODE_ENV !== "production") {
//    import("dotenv").then(dotenv => dotenv.config());
//  }

dotenv.config()

const port = process.env.PORT || 9000

app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))
//frontend URL
app.use(cors({
  origin: "https://ashmademoiselle-8623d0938879.herokuapp.com/", 
}))
app.use("/", indexRouter)

const username_mongo = process.env.username_mongo
const password_mongo = process.env.mongo_password

mongoose
  .connect(
    `mongodb+srv://${username_mongo}:${password_mongo}@eshop.yo4pqlj.mongodb.net/eshop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Atlas connected!")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

////////
/*
npm init -y
npm install express
npm install --save-dev nodemon
npm install mongoose
npm install mongodb
npm i dotenv
npm install multer

*/
