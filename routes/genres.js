const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


//to display all genres
router.get('/',async (req,res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});


//to add a new genre

router.post("/", async (req, res) => {
  
  let genre = new Genre({  name: req.body.name  });
  
  genre = await genre.save();
  
  res.status(200).send(genre);

});

//To update an existing genre
router.put("/:id", async (req, res) => {

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true});
  
  //if the element is not there with id error
    if (!genre) res.status(400).send("No such genre with this id exists");
  //change the element
  
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //if the element is not there with id error
  
  if (!genre) res.status(400).send("No such genre with this id exists");

  //if present then delete it
   res.send(genre);
});

//to display a particular genres
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) res.status(400).send('No such genre found with this id ..')
  res.send(genre);
});

module.exports = router;
