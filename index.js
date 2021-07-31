const config = require('config');
const debug = require('debug')('app:startup');
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const morgan = require('morgan');

const app=express();
app.use(express.json());
app.use(express.static('public'));

//Connect to MongoDB
mongoose.connect('mongodb://localhost/vidly')
 .then(() => console.log('Connected to Mongodb'))
 .catch(err => console.log(err.message));


app.use('/api/genres',genres);
//app.use('/',home);
app.use('/api/customers',customers);

const port = process.env.PORT || 4000;
app.set('view engine','pug');
app.set('views','./views');  //default place where it will get stored
//console.log(`app: ${app.get('env')}`);
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("Morgan enabled......");
}

app.listen(port, (req,res) =>{
        console.log(`Server running at the port ${port}`);
});