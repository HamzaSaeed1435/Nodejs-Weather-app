const request = require('request')
const forecast =(latitude,longitude,callback) => {  
    console.log(latitude)
    console.log(longitude)  
    const url = 'http://api.weatherstack.com/current?access_key=2cf84e49887e6e3aabcda7a25ae1a640&query='+latitude+','+longitude+'&unit=m'
    console.log('url'+url)
    request({ url: url }, (error, {body}={}) => {
        if(error){
            callback('unable to connect to location services !!!!',undefined)
        }else if(body.error){
            callback('unable to find location try another one',undefined)
        }else{
            const data = JSON.parse(body)
            callback(undefined , data.current.weather_descriptions[0] + 'There is ' + data.current.temperature+ 'degree out but feels like ' + data.current.feelslike + ' degree')
        }
        
    })
}
module.exports=forecast

