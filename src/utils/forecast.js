const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7c7d9aa8cf0d7c21b0b21f00eca4540f&query=' + latitude +',' + longitude;
    request({url,json:true},(error,{body}) => {
    if(error){
        callback('Unable to connect to weather service');
    }else if(body.error){
        callback('Unable to find location');
    }else {
        const data = body.current;
        callback(undefined, `It is currently ${data.temperature} degrees out but it feels like ${data.feelslike}`
        )
    }
   
})
}

module.exports = forecast;