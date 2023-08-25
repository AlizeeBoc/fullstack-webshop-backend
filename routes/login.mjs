import express from "express"
const router = express()

router.get('/', async(req, res) => {
    console.log('hello'); // res.render(login.ejs) the form to login
})
 
export default router