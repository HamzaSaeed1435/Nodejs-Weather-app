const request = require('request')
const geoCode = (address,callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFtemFzYWVlZDEyIiwiYSI6ImNrcHBhbDRveTAxbXIycGxldjU1MWFmeXEifQ.N5DZzm8lp3P0JrfGeMsEVA&limit=1'
    console.log('geocode url '+geocodeURL)
    request({ url: geocodeURL, json: true }, (error, {body}={}) => {
        if(error){
            callback('unable to connect to location services !' , undefined)
        } else if(body.features.length==0){
            callback('unable to find location ! try another one !!!!',undefined)   
            } else{
                callback(undefined, body.features[0].center)
                
            }
       
    })
    
}
module.exports=geoCode