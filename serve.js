const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const saltRounds = 10;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/sends', (req, res) => {
  console.log("varuthu");
  const { username, password } = req.body;
  console.log(username);
  // Check if the username and password are valid
  if (username === 'myusername' && password === 'mypassword') {
    req.session.user = username;
    res.json({ success: true });
  } else {
    res.json({ success: true });
  }
});

app.get('/home', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user}!`);
  } else {
    res.redirect('/');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
