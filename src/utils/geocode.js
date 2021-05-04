const request = require('request')

const geocode = (addres, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(addres) + '.json?access_token=pk.eyJ1IjoiZXN0ZWJhbmd1dG0iLCJhIjoiY2tuejM3Y3psMDFqeDJvcnRydnNjN2kyNSJ9.SpenZTKBLDZC3Z_w0uxiRg&limit=1'

    request({ url, json: true}, (error, { body }) => {
    
        if (error) {
            callback('Unable to connect to Geocode Service', undefined)
        } else if (body.message === 'Not Found') {
            callback('Favor ingresar una direccion', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } 
        else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            })
        } 
    })
}


const weather = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=aa0c68a31c1bb03e0fe1a81a502af73c&query=' + latitude + ',' + longitude + '&units=m'
        
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        } 
        else {
            callback(undefined, body.current)
        }    
    })
}


module.exports = {
    geocode: geocode,
    weather: weather
}