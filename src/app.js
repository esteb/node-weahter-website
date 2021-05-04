const path = require('path')   // esto viene onstalado con node
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils/geocode.js')

//para reiniciar el servidor cada vez que se cambie un archive js o hbs
//-e: extenciones
//nodemon src/app.js -e js,hbs


// console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()

//crea una variable y la setea con el valor del puerto segun las variables de ambientes de heroku
//y se agrega el operador o || para setear un valor por defecto si no existe el valor de ambiente, en este caso 3000
const port = process.env.PORT || 3000

//define pths for Express config
const publicDirectoryPath   = path.join(__dirname, '../public')
const viewsPath             = path.join(__dirname, '../templates/views')
const partialsPath          = path.join(__dirname, '../templates/partials')

//setaup handlebars engine and views location
app.set('view engine', 'hbs')  //se hace referencia al motor de pantillas instalado:  npm i hbs@4.0.1
app.set('views', viewsPath)  //le indco a hbs que las vitas van a estar en la carpeta templates y no en la views (por default)
hbs.registerPartials(partialsPath)

//setup static directory serve
// los archivos .html que estuvieran en /public    ejemplo: public/index.html
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Esteban Gutierrez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Esteban Gutierrez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        name: 'Esteban Gutierrez',
        helptext: 'Texto de la pagina ayuda'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.addres) {
        return res.send({
            error: 'You must provide a addres'
        })
    }

    utils.geocode(req.query.addres, (error, {latitude, longitude, location} = {})=>{
        if (error) return res.send({error})
    
        utils.weather(latitude, longitude, (error, {weather_descriptions, temperature, feelslike}={} )=>{
            if(error) return res.send({error})

            return res.send({
                forecast    : location +' : '+ weather_descriptions + '. It is Currently '+ temperature + ' degress out. It feels like '+ feelslike+' degress out.',
                location    ,
                addres      : req.query.addres,
                temperature ,
                feelslike
            })
        })  
    }) 

   
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search terms'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        text: 'Help article not found',
        name: 'Esteban Gutierrez'
    })
})


//tiene que estar al final de las rutas
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        text: 'Page not found',
        name: 'Esteban Gutierrez'
    })
})


/*
como enlazamos el directorio public, cuando no se ingrese ruta mostrará el index.html y no el titulo que habiamos
escrito antes:
app.get('', (req, res) => {
    res.send('<h1>Hello express!</h1>')
})
*/

// app.get('/help', (req, res) => {
    // res.send('Help page')

    // res.send({
    //     name: 'Esteban',
    //     age: 31
    // })

    // res.send([{
    //     name: 'Esteban'
    // },{
    //     name: 'Sarah'
    // }])

// })

// app.get('/about', (req, res) => {
//     res.send('about page')
// })

app.get('/weather', (req, res) => {
    res.send('weather page')
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port',port)
})