const {Customers} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


  //display list of all customers
  router.get('/', async (req,res) => {
    const customers = await Customers.find().sort('name');
    res.send(customers);
  });

  //to add a customer to the databse
  router.post('/',async (req,res) => {
   let customer = new Customers(
        { isGold : req.body.isGold, name : req.body.name,phone : req.body.phone});
        customer = await customer.save();
        res.status(200).send(customer);
  });
  //to update a customer with
  router.put('/', async(req, res) => {
    
  const customer = await Customers.findByIdAndUpdate(req.params.id, 
    { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone  },
    { new: true});
  
  //if the element is not there with id error
    if (!customer) res.status(400).send("No such customer with this id exists");
  //change the element
  
  res.send(customer);
  });
  router.delete("/:id", async (req, res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    //if the element is not there with id error
    
    if (!customer) res.status(400).send("No such Customer with this id exists");
  
    //if present then delete it
     res.send(customer);
  });

  //to display a particular genres
router.get("/:id", async (req, res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) res.status(400).send('No such genre found with this id ..')
    res.send(customer);
  });
  
  module.exports = router;