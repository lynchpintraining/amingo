const express = require('express');
const router = express.Router(); //we just wanted router and not the whole express
const Feeds = require('../models/Feeds'); //we need this because we are doing database oeprations

router.post('/', (req, res) => {
    
    const feedsData = {
        userName : req.body.userName,
        comment : req.body.comment,
        tags : req.body.tags,
        image : req.body.image,
    }
  
const newFeed = new Feeds(feedsData)
    newFeed
    .save() 
    .then((newFeedData) => {
        res.json(newFeedData)
    })
    
    .catch((err) => {
        console.log('error', err);
    })   
   
})

router.post('/addlike', async (req, res)=>{
    
    let userLikes;
    let theFeedID = req.body.feedid;
    let userID = req.body.userid;

    // 1. Get the document with matching id. 
    let theDocument = await Feeds
    .find({_id: theFeedID}) // promise. also we are searching in mongoose with .find and searching the id. find function will array of documents matching your search
    .catch(err=>{
        res.send(err)
    })
    
    // 2. Extract the likes from the document
    userLikes = theDocument[0].likes;

    // 3. Push the new like to the array
    //if user already exisits
    if(userLikes.includes(userID)) {
        userLikes.splice(
            userLikes.indexOf(userID), // position of userID in the array
            1 // number items we want to remove from the array
        );
    } else {
        userLikes.push(userID);
    }

    // 4. Update the document
    Feeds
    .updateOne(
        {_id: theFeedID},
        {likes: userLikes}
    ) //promise
    .then(theFeed=>{
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    });

});

module.exports = router;
