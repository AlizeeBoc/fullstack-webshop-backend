import express from "express"
const app = express()
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser"
import indexRouter from "./routes/index.mjs"

const port = process.env.PORT || 3000
const nodeEnv = process.env.NODE_ENV
const mySetting = process.env.MY_SETTING


app.use(express.json())
app.use(bodyParser.urlencoded({ limit : '10mb', extended : false }))

app.use("/", indexRouter)

const username_mongo = process.env.username_mongo
const password_mongo = process.env.mongo_password

mongoose.connect(`mongodb+srv://${username_mongo}:${password_mongo}@eshop.yo4pqlj.mongodb.net/eshop?retryWrites=true&w=majority`, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
console.log('MongoDB Atlas connected!');
}).catch(err => {
console.log(err);
});

app.get('/api/healthcheck', (req, res) => {
    res.send({
        status : 'online',
        nodeEnv,
        mySetting
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})



























//////// 
/*
npm init -y
npm install express
npm install --save-dev nodemon
npm install mongoose
npm install mongodb
npm i dotenv
*/