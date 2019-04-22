const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZXNodS1rdW1hciIsImEiOiJjaml6cncxajYwYThzM3ZvNnQxM3JsOHNpIn0.KZTu7RTYBUHOlR8NeALn0w";
    request({url,json:true},(error,{body}={})=>{
      if(error){
        callback('unable to connect',undefined);
      }
      else if(body.features.length===0){
        callback('unable to find location check the location',undefined);
      }
      else{
        //console.log(response.body.features)
        callback(undefined,{latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name})
      }
    })
  }
  module.exports=geocode