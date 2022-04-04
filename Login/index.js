const express = require('express')
const app = express()
const port = 5000

const { User } = require("./models/User");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const uri = "mongodb+srv://JoongWon:1234@boilerplate-login.frbz2.mongodb.net/Boilerplate-Login?retryWrites=true&w=majority";
const mongoose = require('mongoose')
mongoose.connect(uri)
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕asd')
})

app.post('/register', (req,res) => {

  const user = new User(req.body)

  user.save((err,userInfo) =>{
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

