const express = require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
const cors=require('cors');
const knex = require('knex');
const signup=require('./controllers/signup');
const signin=require('./controllers/signin');
const image=require('./controllers/image');
require('dotenv').config();

const saltRounds = 10;

const dbase=knex({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,resp)=>{resp.send('working ')})

app.post('/signin',(req,resp)=>{signin.handlesignin(req,resp,dbase,bcrypt)})

app.post('/signup',(req,resp)=>{signup.handlesignup(req,resp,dbase,bcrypt,saltRounds)})

app.put('/image',(req,resp)=>{image.handleimage(req,resp,dbase)})

app.post('/imageUrl',(req,resp)=>{image.handleApicall(req,resp)})


app.listen(process.env.PORT|| 3000,()=>{
    console.log(`app is runing on ${process.env.PORT}`)
})