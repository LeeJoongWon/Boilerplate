const express = require('express');
const app = express();
const port = 5000;

const config = require('./config/key');

const {
  User
} = require("./models/User");

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! 안녕 노드몬')
});

app.post('/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {

    if (err) {
      return res.json({
        success: false,
        err
      });
    }

    return res.status(200).json({
      success: true
    });

  })
})

app.post('/login', (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 이메일정보가 없습니다"
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {

      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });
      }

      user.generateToken((err, user) => {

      })

    })

  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
