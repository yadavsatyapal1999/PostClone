const express = require('express');
const postrouter = express.Router();
const createpost = require('../Schema/createpost');
const authorization = require('../Auth/authorization')


// for creating Post
postrouter.post('/createpost', authorization, (req, res) => {
    const post = req.body;  // need information in the body

    const postdetail = new createpost({
        about: post.about,
        author: req.id,  // takes id  from token verification from user
        like: post.like
    })
    postdetail.save().then((record) => res.send({
        message: "saved to db sucessfully",
    }))
        .catch(err => {
            res.send("failed to create post")
        })
})


// Update a post 
postrouter.put('/updatepost/:id', authorization, (req, res) => {
    const body = req.body;
    const newone = req.params.id; // Take id from the params
    console.log(newone)
    createpost.findOneAndUpdate({ _id: newone, author: req.id }, body).then((response) => { // Verify and update
        // if _id and author matches
        if (response) {
            res.status(200).json("updated Sucessfully")
        } else {
            res.status(500).json("failed to update")
        }
    })
})



//  Get a post
postrouter.get('/getpost', authorization, (req, res) => {
    createpost.find({ author: req.id }).then(posts => { //return all post have matching author
        res.send(posts)
    })
})

// Delete post
postrouter.delete('/deletepost/:id', (req, res) => {
    const deleteone = req.params.id // 

    createpost.deleteOne({ _id: deleteone, author: req.id }).then(response => {
        // delete post if id and author match
        if (response.deletedCount != 0) {
            res.status(200).json("deleted sucessfully"); // execute if any post is deleted

        } else {
            res.status(500).json("unable to delete");
        }
    })
        .catch(err => {
            res.status(404).json(err)
        })
})



module.exports = postrouter;