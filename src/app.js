const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Demilade Olorode'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Demilade Olorode'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg:'Get all the help you need',
        title:'Help',
        name:'Demilade Olorode'
    });
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Pls provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error:'Unable to find location. Try another search'
            });
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:'Unable to find location'
                });
            }

            res.send({
                location,
                forecast: forecastData
            })
           
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errMsg:'Help article not found',
        name:'Demilade Olorode'
    });
})

app.get('*',(req,res) => {
    res.render('404',{
        errMsg:'Page not found',
        name:'Demilade Olorode'
    });
})

app.listen(port,() => {
    console.log('Server is up on port' + port);
})