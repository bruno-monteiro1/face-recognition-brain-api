const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex'); 

const register =  require('./controllers/register.js');
const signin =  require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');


const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-closed-94727',
    user : 'bruno',
    password : '',
    database : 'frb'
  }
});

db.select('*').from('users')
.then(data => {
})

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It works!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrypt, db) });
app.post('/register', (req, res) => { register.handleRegister(req, res, bcrypt, db) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageapi', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app rodando na porta ${process.env.PORT}`)
});


