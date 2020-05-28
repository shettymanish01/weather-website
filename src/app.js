const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get("", (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Manish'
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Manish Shetty'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a very useful text.',
        title: 'Help',
        name: 'Manish Shetty'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData, maxTemp) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                maxTemp,
                forecast: forecastData,
                address: req.query.address

            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article not found',
        name: 'Manish Shetty'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Manish Shetty'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})