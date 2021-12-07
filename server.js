const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
moment().format();

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

//Creating Schema and Model
const {Schema} = mongoose;
const userSchema = new Schema({
  username: {type: String, required: true},
  count: Number,
  exercices: [{
    description: {type: String},
    duration: {type: Number},
    date: {type: String, required: false}
  }]
});
const Username = mongoose.model('Username', userSchema);

//Express Requests
let resNewUser = {};
app
  .route('/api/users')
  .post((req, res) => {
    const inputUsername = req.body.username;
    resNewUser['username'] = inputUsername;
    Username.findOne({username: inputUsername}, (err, usernameFound) => {
      //Check if the username isn't already registered
      if(!err && usernameFound != undefined) {
        resNewUser['_id'] = usernameFound['_id'];
        res.json(resNewUser);
        return;
      //Register the new username
      } else {
        Username.create({username: inputUsername, count: 0}, (err, usernameCreate) => {
          resNewUser['_id'] = usernameCreate['_id'];
          res.json(resNewUser);
        });
      };
    });
  })
  .get((req, res) => {
    Username.find({})
            .select({count: 0, exercices: 0})
            .exec((err, data) => {
              res.json(data)
            });
  });

app.post('/api/users/:inputid/exercises', (req, res) => {
  var { _id, description, duration, date } = req.body;
  const toNumber = duration;
  duration = Number(toNumber);
  const newDate = date || Date.now();
  date = moment(newDate);
  let newCount;
  let newExercices = [];
  Username.findOne({_id})
          .exec((err, data) => {
            if(err || data == undefined) {
              return res.json({error: 'Id not found.'})
            }
            if(!err && data != undefined) {
              newExercices = data.exercices;
              newCount = data.count + 1;
              newExercices.push({description, duration, date});
              Username.findOneAndUpdate(
                {_id},
                {count: newCount, exercices: newExercices},
                {new: true},
                (err, doc) => {
                  res.json({username: doc.username, _id, description, duration, date: date.format('ddd MMM DD YYYY')})
                }
              );
            }
          });
});

app.get('/api/users/:id/logs', (req, res) => {
  const inputId = req.params.id;
  const inputFrom = req.query.from || '0000-01-01';
  const inputTo = req.query.to || '9999-12-31';
  Username.findOne({_id: inputId})
          .exec((err, data) => {
            if(err || data == undefined) {
              return res.json({error: 'Id not found.'})
            }
            if(!err && data != undefined) {
              let inputLimit = Number(req.query.limit) || data.count;
              let logArray = data.exercices
                .filter(e => moment(e.date) >= moment(inputFrom) && moment(e.date) <= moment(inputTo))
                .map(e => ({
                  description: e.description,
                  duration: e.duration,
                  date: moment(e.date).format('ddd MMM DD YYYY')
                }))
                .slice(0, inputLimit);
              let resLog = {};
              resLog._id = data._id;
              resLog.username = data.username;
              resLog.count = logArray.length;
              resLog.log = logArray;
              res.json(resLog)
            }
          });
});