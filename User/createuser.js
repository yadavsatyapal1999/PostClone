const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserRouter = express.Router();
const CreateUser = require("../Schema/createuser");


UserRouter.post('/register', (req, res) => {
    const body = req.body;
    console.log("register")
    bcrypt.hash(body.password, 10).then(encryptedpass => { // will encrypt password 10 times
        const User = new CreateUser({
            name: body.name,
            email: body.email,
            password: encryptedpass
        })
        User.save().then(record => {  // saves encrypted password to database
            res.status(200).json({
                message: "User created Sucessfully",
            })
        }).catch(err => {
            res.send("Unable to register")
        })
    })
        .catch(err => {
            res.send("failed to register");
        })
})

UserRouter.post('/login', (req, res) => {
    const body = req.body

    CreateUser.findOne({ email: body.email }).then((user) => {
        if (user) {
            return bcrypt.compare(body.password, user.password).then((authstatus) => { // Compare 
                // it will encrypt body password and compare with DB password and will return boolean
                if (authstatus) {
                    jwt.sign({
                        email: user.email, // email and id are the information passed to token 
                        id: user._id
                    },
                        "InstaClone", { // Secrete key
                        expiresIn: "1h" // It is the duration in which token will expires
                    }, (err, token) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send(token)
                        }
                    }
                    )
                } else {
                    res.send("Authentication failed");
                }
            })
        } else {
            res.send("User Not found");
        }


    })
        .catch(err => {
            res.send("error in login")
        })
})


module.exports = UserRouter;