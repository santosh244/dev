
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = new express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now  = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n' , (err) => {
    if(err){
      console.log('Unable to write log');
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs',{
      welcomeMessage: 'Hello bruh !',
      pageTitle:'About',
  //    currentYear: new Date().getFullyear()
    });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle:'About',
    // currentYear: new Date().getFullyear()
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Errrrr!... server crashed'
  })
});

app.listen(port );
