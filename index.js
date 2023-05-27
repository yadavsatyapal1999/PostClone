const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const postrouter = require('./Post/post')
const UserRouter = require('./User/createuser')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb+srv://satyapalmechworld:axN0ykTi1TcZ18ED@cluster0.qkhyapj.mongodb.net/postingapp?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to DB")
    })
// for post creation         /post/createuser
//for updatepost             /post/updatepost/:id
//To see post                 /post/getpost
// To delete post             /post/deletepost/:id
// To create new user          /user/register
// To login user               /user/login


app.use('/post', postrouter) // will move to post.js if we provide givre url localhost3000/post
app.use('/user', UserRouter) // will move to createuser.js if we provide givr=e url localhost3000/post

app.listen(3000, () => { // will listen at the port 3000
    console.log("started at  port " + 3000)
})
