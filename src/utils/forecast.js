const request=require('request')
const forecast= (latitude,longitude,callback)=>{
    const latlong=latitude+','+longitude;
    const url='https://api.darksky.net/forecast/20c5703c638354f15ca37e69270c4955/'+latlong+'?units=si';
    request({url,json:true},(error,{body}={})=>{
      if(error){
        callback('unable to connect',undefined)
      }else if(body==='Not Found\n'){
       callback("location not found",undefined);
      }
      else if(body.error){
          callback(body.error,undefined);
      }
      else{
        const temperature=`today the temperature is ${body.currently.temperature} and the chances of rain is ${body.currently.precipProbability}`;
        const summary=body.daily.summary;
        callback(undefined,{temperature:temperature,
        summary:summary})
      }
      })
  }
  module.exports=forecast