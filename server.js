const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
app.set('view engine','hbs');

//Registering for the partials to use in our hbs file...
hbs.registerPartials(__dirname + '/views/partials');

//Helper Function to add the rendering data to the partials...
hbs.registerHelper('currentYear',() => {
  return new Date().getFullYear();
});

//Express Middleware Example...
app.use((req,res,next) =>{
  var time = new Date().toString();
  var log = `${time} : ${req.method} ${req.originalUrl}`;

  fs.appendFile('server.log',log+'\n' ,(err) => {
    if(err){
      console.log('Unable to write log in the file.');
    }
  })
  console.log(log);
  next();
});

//Express Middleware for the Maintenance page...
// app.use((req,res,next) => {
//   res.render('maintenance.hbs',undefined);
// })

//Express Middleware for handling static pages...
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res) => {

  res.render('home.hbs',{
    welcomeMessage : 'Welcome To HomePage of Example',
    pageTitle : 'Home Page'
  });
});

app.get('/about', (req,res) => {
  res.render('About.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad' ,(req,res) => {
  res.send({
    erroMessage : 'Unable to connect to server'
  })
});

app.listen(1200,() => {
  console.log('Server Started with port 1200');
});
