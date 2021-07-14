const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast =require('../utils/forecast')
const  geocode =require('../utils/geocode')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hamza saeed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hamza saeed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hamza saeed'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error :'please provide address'
        })
    }
    geocode(req.query.address,(error,data) => {
        if(error){
            return res.send({
                error 
            })
        }
   
        
        forecast(data[1],data[0],(error,forecastdata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast :forecastdata,
                address : req.query.address
            })
        })
    })
   
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
             error : 'please provide searh !!!'
        })
    }
    console.log(req.query)
    res.send({
        product :[]
    })
})
// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Andrew Mead',
//         errorMessage: 'Help article not found.'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Andrew Mead',
//         errorMessage: 'Page not found.'
//     })
// })

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})