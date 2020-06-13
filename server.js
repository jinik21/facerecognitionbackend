const express = require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
const cors=require('cors');
const knex = require('knex');
const signup=require('./controllers/signup');
const signin=require('./controllers/signin');
const image=require('./controllers/image');

const saltRounds = 10;

const dbase=knex({
        client: 'pg',
        connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'nikheel121',
        database : 'facerecognition'
        }
    });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,resp)=>{resp.send(dbase.users)})

app.post('/signin',(req,resp)=>{signin.handlesignin(req,resp,dbase,bcrypt)})

app.post('/signup',(req,resp)=>{signup.handlesignup(req,resp,dbase,bcrypt,saltRounds)})

app.put('/image',(req,resp)=>{image.handleimage(req,resp,dbase)})

app.post('/imageUrl',(req,resp)=>{image.handleApicall(req,resp)})


app.listen(3000,()=>{
    console.log('app is runing on 3000')
})